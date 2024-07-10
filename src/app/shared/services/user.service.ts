import { Injectable, inject } from '@angular/core';
import { Observable, first, from, map, of, switchMap } from 'rxjs';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  docData,
  orderBy,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { User, UserDTO } from '../models/user.model';
import { AuthService } from './auth.service';
import { CommunitiesService } from './communities.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  readonly firestore = inject(Firestore);

  private readonly usersCollection = collection(this.firestore, 'users');

  private readonly communitiesService = inject(CommunitiesService);

  readonly authService = inject(AuthService);

  readonly user$ = this.authService.userFire$.pipe(
    switchMap((userFire) => {
      if (userFire) {
        return this.getUserById(userFire.uid);
      }
      return of(null);
    }),
  );

  getCommunityMembers(communityId: string): Observable<User[]> {
    const q = query(
      this.usersCollection,
      where('joinedCommunitiesId', 'array-contains', communityId),
      orderBy('name'),
    );

    return collectionData(q, { idField: 'id' }).pipe(
      map((users) => {
        return users.map((user) => ({
          ...user,
          notifications: user['notifications'].map((notification) => ({
            ...notification,
            date: new Date(notification.date),
          })),
        }));
      }),
    ) as Observable<User[]>;
  }

  joinCommunity(communityId: string, userId: string, userData: Partial<User>): Observable<void> {
    const joinedCommunitiesId = [...userData.joinedCommunitiesId, communityId];
    this.communitiesService
      .getCommunityById(communityId)
      .pipe(first())
      .subscribe((community) => {
        this.communitiesService.updateCommunity(community.id, {
          ...community,
          joinedAmount: community.joinedAmount + 1,
        });
      });
    return this.updateUser(userId, { joinedCommunitiesId });
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
    return this.updateUser(userId, { joinedCommunitiesId });
  }

  getUserById(userId: string): Observable<User> {
    const docRef = doc(this.usersCollection, userId);
    return docData(docRef, { idField: 'id' }).pipe(
      map((data) => {
        if (!data) return null;
        return {
          ...data,
          notifications: data['notifications']?.map((notification) => ({
            ...notification,
            date: new Date(notification.date),
          })),
        } as User;
      }),
    );
  }

  getUserByName(userName: string): Observable<User | null> {
    const q = query(this.usersCollection, where('name', '==', userName));
    return collectionData(q, { idField: 'id' }).pipe(
      map((users) => {
        const user = users[0];
        if (!user) return null;
        return {
          ...user,
          notifications: user['notifications']?.map((notification) => ({
            ...notification,
            date: new Date(notification.date),
          })),
        } as User;
      }),
    );
  }

  updateUser(userId: string, userData: Partial<UserDTO>): Observable<void> {
    const docRef = doc(this.usersCollection, userId);
    const promise = updateDoc(docRef, { ...userData });
    return from(promise);
  }
}
