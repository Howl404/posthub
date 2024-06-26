import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  getDoc,
  limit,
  orderBy,
  query,
  startAt,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { Observable, from, map } from 'rxjs';
import { Post, PostDraft } from 'src/app/post.model';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  firestore = inject(Firestore);

  postsCollection = collection(this.firestore, 'posts');

  getPostsByLocationId(locationId: string, _limit: number, _startAt: number): Observable<Post[]> {
    const q = query(
      this.postsCollection,
      where('location', '==', locationId),
      orderBy('date'),
      limit(_limit),
      startAt(_startAt),
    );
    return collectionData(q, { idField: 'id' }) as Observable<Post[]>;
  }

  getPostById(postId: string): Observable<Post> {
    const docRef = doc(this.postsCollection, postId);
    const promise = getDoc(docRef);
    return from(promise).pipe(
      map((docSnapshot) => {
        const data = docSnapshot.data();
        return { ...data, id: docSnapshot.id } as Post;
      }),
    );
  }

  createPost(post: PostDraft): Observable<string> {
    const promise = addDoc(this.postsCollection, post).then((response) => response.id);
    return from(promise);
  }

  updatePost(postId: string, post: Partial<Post>): Observable<void> {
    const docRef = doc(this.postsCollection, postId);
    const promise = updateDoc(docRef, { ...post });
    return from(promise);
  }

  deletePost(postId: string): Observable<void> {
    const docRef = doc(this.postsCollection, postId);
    const promise = deleteDoc(docRef);
    return from(promise);
  }
}
