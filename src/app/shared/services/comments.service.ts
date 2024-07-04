import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  where,
  orderBy,
  limit,
  startAt,
  collectionData,
  query,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  docData,
} from '@angular/fire/firestore';
import { Observable, from, map } from 'rxjs';
import { Comment, CommentDraft } from '../models/comment.model';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  firestore = inject(Firestore);

  commentsCollection = collection(this.firestore, 'comments');

  getCommentsByLocationId(
    locationId: string,
    _limit: number,
    _startAt: number,
  ): Observable<Comment[]> {
    const q = query(
      this.commentsCollection,
      where('location', '==', locationId),
      orderBy('date'),
      limit(_limit),
      startAt(_startAt),
    );
    return collectionData(q, { idField: 'id' }).pipe(
      map((comments) =>
        comments.map((comment) => ({
          ...comment,
          date: new Date(comment['date']),
        })),
      ),
    ) as Observable<Comment[]>;
  }

  getCommentById(userId: string): Observable<Comment | null> {
    const docRef = doc(this.commentsCollection, userId);
    return docData(docRef, { idField: 'id' }).pipe(
      map((data) => {
        if (!data) return null;
        return {
          ...data,
          date: new Date(data['date']),
        } as Comment;
      }),
    );
  }

  createComment(comment: CommentDraft): Observable<string> {
    const formattedPost = {
      ...comment,
      date: comment.date.getTime(),
    };
    const promise = addDoc(this.commentsCollection, formattedPost).then((response) => response.id);
    return from(promise);
  }

  updatePost(commentId: string, comment: Partial<Comment>): Observable<void> {
    const docRef = doc(this.commentsCollection, commentId);
    const promise = updateDoc(docRef, { ...comment });
    return from(promise);
  }

  deletePost(commentId: string): Observable<void> {
    const docRef = doc(this.commentsCollection, commentId);
    const promise = deleteDoc(docRef);
    return from(promise);
  }
}
