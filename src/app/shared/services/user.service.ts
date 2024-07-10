import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, first, from, map, of, switchMap } from 'rxjs';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  docData,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { User } from '../models/user.model';
import { AuthService } from './auth.service';
import { CommunitiesService } from './communities.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  readonly firestore = inject(Firestore);

  private readonly usersCollection = collection(this.firestore, 'users');

  private readonly communitiesService = inject(CommunitiesService);

  private readonly user = new BehaviorSubject<User | null>(null);

  readonly user$ = this.user.asObservable();

  readonly authService = inject(AuthService);

  constructor() {
    this.authService.userFire$
      .pipe(
        switchMap((userFire) => {
          if (userFire) {
            return this.getUserById(userFire.uid);
          }
          return of(null);
        }),
      )
      .subscribe((user) => this.user.next(user));
  }

  getCurrentUser(): User | null {
    return this.user.getValue();
  }

  getCommunityMembers(communityId: string): Observable<User[]> {
    const q = query(
      this.usersCollection,
      where('joinedCommunitiesId', 'array-contains', communityId),
    );
    return collectionData(q, { idField: 'id' }) as Observable<User[]>;
  }

  joinCommunity(communityId: string, userId: string, userData: Partial<User>): Observable<void> {
    userData.joinedCommunitiesId.push(communityId);
    this.communitiesService
      .getCommunityById(communityId)
      .pipe(first())
      .subscribe((community) => {
        this.communitiesService.updateCommunity(community.id, {
          ...community,
          joinedAmount: community.joinedAmount + 1,
        });
      });
    return this.updateUser(userId, { ...userData });
  }

  leaveCommunity(communityId: string, userId: string, userData: Partial<User>): Observable<void> {
    const joinedCommunitiesId = userData.joinedCommunitiesId.filter(
      (community) => community !== communityId,
    );
    this.communitiesService
      .getCommunityById(communityId)
      .pipe(first())
      .subscribe((community) => {
        this.communitiesService.updateCommunity(community.id, {
          ...community,
          joinedAmount: community.joinedAmount - 1,
        });
      });
    return this.updateUser(userId, { ...userData, joinedCommunitiesId });
  }

  getUserById(userId: string): Observable<User> {
    const docRef = doc(this.usersCollection, userId);
    return docData(docRef, { idField: 'id' }).pipe(
      map((data) => {
        if (!data) return null;
        return {
          ...data,
        } as User;
      }),
    );
  }

  getUserByName(userName: string): Observable<User | null> {
    const q = query(this.usersCollection, where('name', '==', userName));
    return collectionData(q, { idField: 'id' }).pipe(
      map((users) => {
        const result = users ? (users[0] as User) : null;
        return result;
      }),
    );
  }

  updateUser(userId: string, userData: Partial<User>): Observable<void> {
    const currentUser = this.user.getValue();
    if (currentUser.id === userId) {
      this.user.next({ ...currentUser, ...userData });
    }
    const docRef = doc(this.usersCollection, userId);
    const promise = updateDoc(docRef, { ...userData });
    return from(promise);
  }
}
