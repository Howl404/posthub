import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  docData,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { Observable, from, map } from 'rxjs';
import { Community, CommunityDraft } from '../models/community.model';

@Injectable({
  providedIn: 'root',
})
export class CommunitiesService {
  firestore = inject(Firestore);

  communitiesCollection = collection(this.firestore, 'communities');

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
}
