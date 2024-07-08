import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  collectionData,
  deleteDoc,
  doc,
  docData,
  limit,
  orderBy,
  query,
  startAt,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { Observable, first, forkJoin, from, map, switchMap } from 'rxjs';
import { Post, PostDraft, PostDTO } from '../models/post.model';
import { Upvote } from '../models/upvote.model';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  firestore = inject(Firestore);

  postsCollection = collection(this.firestore, 'posts');

  usersCollection = collection(this.firestore, 'users');

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
        posts
          .map((post) => ({
            ...post,
            date: new Date(post['date']),
            upvotesByDay: post['upvotesByDay'].map((upvote) => ({
              ...upvote,
              date: new Date(upvote.date),
            })),
          }))
          .reverse(),
      ),
    ) as Observable<Post[]>;
  }

  getPostById(postId: string): Observable<Post | null> {
    const docRef = doc(this.postsCollection, postId);
    return docData(docRef, { idField: 'id' }).pipe(
      map((data) => {
        if (!data) return null;
        return {
          ...data,
          date: new Date(data['date']),
          upvotesByDay: data['upvotesByDay'].map((upvote) => ({
            ...upvote,
            date: new Date(upvote.date),
          })),
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

  updatePost(postId: string, post: Partial<PostDTO>): Observable<void> {
    const docRef = doc(this.postsCollection, postId);
    const promise = updateDoc(docRef, { ...post });
    return from(promise);
  }

  deletePost(postId: string): Observable<void> {
    const docRef = doc(this.postsCollection, postId);
    const promise = deleteDoc(docRef);
    return from(promise);
  }

  deletePostsByLocationId(locationId: string): Observable<string[]> {
    return this.getPostsByLocationId(locationId, 999, 0).pipe(
      first(),
      switchMap((posts) => {
        const deleteObservables = posts.map((post) => this.deletePost(post.id));
        return forkJoin(deleteObservables).pipe(map(() => posts.map((post) => post.id)));
      }),
    );
  }

  upvotePost(post: Post): Observable<void> {
    const currentDate = new Date();

    const upvotesForCurrentDay = post.upvotesByDay.find((upvote) => {
      const date = new Date(upvote.date);

      return date.getDate() === currentDate.getDate();
    });

    if (upvotesForCurrentDay) {
      upvotesForCurrentDay.amount += 1;
    } else {
      const newUpvote: Upvote = {
        date: currentDate,
        amount: 1,
      };
      post.upvotesByDay.push(newUpvote);
    }

    const upvotes = post.upvotesByDay.map((upvote) => {
      return { ...upvote, date: upvote.date.getTime() };
    });

    return this.updatePost(post.id, {
      ...post,
      date: post.date.getTime(),
      upvotesByDay: upvotes,
      upvotes: post.upvotes + 1,
    });
  }

  downvotePost(post: Post): Observable<void> {
    const currentDate = new Date();

    const upvotesForCurrentDay = post.upvotesByDay.find((upvote) => {
      const date = new Date(upvote.date);

      return date.getDate() === currentDate.getDate();
    });

    if (upvotesForCurrentDay) {
      upvotesForCurrentDay.amount -= 1;
    } else if (!upvotesForCurrentDay) {
      const newUpvote: Upvote = {
        date: currentDate,
        amount: -1,
      };
      post.upvotesByDay.push(newUpvote);
    }

    const upvotes = post.upvotesByDay.map((upvote) => {
      return { ...upvote, date: upvote.date.getTime() };
    });

    return this.updatePost(post.id, {
      ...post,
      date: post.date.getTime(),
      upvotesByDay: upvotes,
      upvotes: post.upvotes - 1,
    });
  }

  addUpvotedPost(userId: string, postId: string): Observable<void> {
    const userDocRef = doc(this.usersCollection, userId);

    return from(
      updateDoc(userDocRef, {
        upvotedPostsId: arrayUnion(postId),
      }),
    );
  }

  removeUpvotedPost(userId: string, postId: string): Observable<void> {
    const userDocRef = doc(this.usersCollection, userId);

    return from(
      updateDoc(userDocRef, {
        upvotedPostsId: arrayRemove(postId),
      }),
    );
  }
}
