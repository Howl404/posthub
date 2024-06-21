import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  query,
  setDoc,
  where,
} from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { Post, PostDraft } from 'src/app/post';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  firestore = inject(Firestore);

  postsCollection = collection(this.firestore, 'posts');

  getPostsByLocationId(locationId: string): Observable<Post[]> {
    const q = query(this.postsCollection, where('location', '==', locationId));
    return collectionData(q, { idField: 'id' }) as Observable<Post[]>;
  }

  createPost(post: PostDraft): Observable<string> {
    const promise = addDoc(this.postsCollection, post).then((response) => response.id);
    return from(promise);
  }

  deletePost(postId: string): Observable<void> {
    const docRef = doc(this.postsCollection, postId);
    const promise = deleteDoc(docRef);
    return from(promise);
  }
}
