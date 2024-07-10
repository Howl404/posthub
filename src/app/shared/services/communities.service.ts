import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  docData,
  or,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { Observable, map, from, combineLatest } from 'rxjs';
import { Community, CommunityDraft } from '../models/community.model';
import { User } from '../models/user.model';

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
        return community || null;
      }),
    );
  }

  getCommunityById(communityId: string): Observable<Community | null> {
    const docRef = doc(this.communitiesCollection, communityId);
    return docData(docRef, { idField: 'id' }).pipe(
      map((data) => {
        return (data as Community) || null;
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
    const communityObservables = user.joinedCommunitiesId.map((id) => this.getCommunityById(id));

    const q = query(
      this.communitiesCollection,
      or(where('ownerId', '==', user.id), where('moderatorsNames', 'array-contains', user.name)),
    );

    const data = collectionData(q, { idField: 'id' }) as Observable<Community[]>;

    return combineLatest([data, ...communityObservables]).pipe(
      map((results) => {
        const firestoreCommunities = results[0] as Community[];
        const queriedCommunities = results.slice(1) as Community[];

        return [...firestoreCommunities, ...queriedCommunities];
      }),
    );
  }
}
