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
import { Post, PostDraft } from '../post.model';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  firestore = inject(Firestore);

  postsCollection = collection(this.firestore, 'posts');

  getPosts(_limit: number, _startAt: number): Observable<Post[]> {
    const q = query(this.postsCollection, orderBy('date'), limit(_limit), startAt(_startAt));
    return collectionData(q, { idField: 'id' }).pipe(
      map((posts) =>
        posts.map((post) => ({
          ...post,
          date: new Date(post['date']),
        })),
      ),
    ) as Observable<Post[]>;
  }

  getPostsByLocationId(locationId: string, _limit: number, _startAt: number): Observable<Post[]> {
    const q = query(
      this.postsCollection,
      where('location', '==', locationId),
      orderBy('date'),
      limit(_limit),
      startAt(_startAt),
    );
    return collectionData(q, { idField: 'id' }).pipe(
      map((posts) =>
        posts.map((post) => ({
          ...post,
          date: new Date(post['date']),
        })),
      ),
    ) as Observable<Post[]>;
  }

  getPostById(postId: string): Observable<Post> {
    const docRef = doc(this.postsCollection, postId);
    const promise = getDoc(docRef);
    return from(promise).pipe(
      map((docSnapshot) => {
        const data = docSnapshot.data();
        return {
          ...data,
          date: new Date(data['date']),
          id: docSnapshot.id,
        } as Post;
      }),
    );
  }

  createPost(post: PostDraft): Observable<string> {
    const formattedPost = {
      ...post,
      date: post.date.getTime(),
    };
    const promise = addDoc(this.postsCollection, formattedPost).then((response) => response.id);
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
