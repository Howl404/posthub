import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  getDoc,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { Observable, forkJoin, from, map } from 'rxjs';

import { Community, CommunityDraft } from '../community.model';
import { User } from '../user.model';

@Injectable({
  providedIn: 'root',
})
export class CommunitiesService {
  firestore = inject(Firestore);

  communitiesCollection = collection(this.firestore, 'communities');

  searchCommunities(queryText: string): Observable<Community[]> {
    const q = query(
      this.communitiesCollection,
      where('name', '>=', queryText),
      where('name', '<=', `${queryText}\uf8ff`),
    );
    return collectionData(q, { idField: 'id' }) as Observable<Community[]>;
  }

  getCommunityByName(communityName: string): Observable<Community | null> {
    const q = query(this.communitiesCollection, where('name', '==', communityName));
    return collectionData(q, { idField: 'id' }).pipe(
      map((communities) => {
        const community = communities[0] as Community | undefined;
        if (community) {
          return community;
        }
        return null;
      }),
    );
  }

  getCommunityById(communityId: string): Observable<Community> {
    const docRef = doc(this.communitiesCollection, communityId);
    const promise = getDoc(docRef);
    return from(promise).pipe(
      map((docSnapshot) => {
        const data = docSnapshot.data();
        return { ...data, id: docSnapshot.id } as Community;
      }),
    );
  }

  createCommunity(community: CommunityDraft): Observable<string> {
    const promise = addDoc(this.communitiesCollection, community).then((response) => response.id);
    return from(promise);
  }

  updateCommunity(communityId: string, community: Partial<Community>): Observable<void> {
    const docRef = doc(this.communitiesCollection, communityId);
    const promise = updateDoc(docRef, { ...community });
    return from(promise);
  }

  deleteCommunity(communityId: string): Observable<void> {
    const docRef = doc(this.communitiesCollection, communityId);
    const promise = deleteDoc(docRef);
    return from(promise);
  }

  getUserCommunities(user: User): Observable<Community[]> {
    const neededCommunitiesIds = [
      ...new Set([...user.joinedCommunitiesId, ...user.moderatingCommunitiesId]),
    ];

    const communityObservables = neededCommunitiesIds.map((id) => this.getCommunityById(id));

    return forkJoin(communityObservables);
  }
}
