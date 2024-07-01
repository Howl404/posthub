import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, first, from, map, of, switchMap } from 'rxjs';
import { Firestore, collection, doc, getDoc, updateDoc } from '@angular/fire/firestore';
import { User } from '../user.model';
import { AuthService } from './auth.service';
import { CommunitiesService } from './communities.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  firestore = inject(Firestore);

  usersCollection = collection(this.firestore, 'users');

  communitiesService = inject(CommunitiesService);

  user = new BehaviorSubject<User | null>(null);

  user$ = this.user.asObservable();

  authService = inject(AuthService);

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
    const promise = getDoc(docRef);
    return from(promise).pipe(
      map((docSnapshot) => {
        const data = docSnapshot.data();
        return { ...data, id: docSnapshot.id } as User;
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
