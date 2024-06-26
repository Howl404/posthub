import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { Observable, first, from, map } from 'rxjs';
import { Community, CommunityDraft } from 'src/app/community.model';

@Injectable({
  providedIn: 'root',
})
export class CommunitiesService {
  firestore = inject(Firestore);

  communitiesCollection = collection(this.firestore, 'communities');

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

  addPostToCommunity(postId: string, communityId: string): void {
    this.getCommunityById(communityId)
      .pipe(first())
      .subscribe((value) =>
        this.updateCommunity(communityId, { postsId: [...value.postsId, postId] }),
      );
  }
}
