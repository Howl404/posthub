import { Injectable, inject } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  user,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  User as UserFire,
} from '@angular/fire/auth';
import { Firestore, collection, doc, setDoc, getDoc, updateDoc } from '@angular/fire/firestore';
import { Observable, catchError, from, map, throwError } from 'rxjs';
import { FirebaseError } from '@angular/fire/app';
import { User, UserDraft } from '../user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  firestore = inject(Firestore);

  auth = inject(Auth);

  user$: Observable<UserFire | null> = user(this.auth);

  usersCollection = collection(this.firestore, 'users');

  signUpWithPassword(userDraft: UserDraft): Observable<boolean> {
    const { email, password, ...additionalData } = userDraft;
    const promise = createUserWithEmailAndPassword(this.auth, email, password).then(
      async (userCred) => {
        const userId = userCred.user.uid;
        await setDoc(doc(this.usersCollection, userId), { ...additionalData, email, password });
        return true;
      },
    );
    return from(promise);
  }

  signUpWithGoogle(): Observable<boolean> {
    const provider = new GoogleAuthProvider();
    const promise = signInWithPopup(this.auth, provider).then(async (result) => {
      const { user: userData } = result;
      const userDraft: Partial<UserDraft> = {
        email: userData.email || '',
        name: userData.displayName || '',
        gender: '',
        dob: '',
        subscribed: false,
        commentsId: [],
        postsId: [],
        joinedCommunitiesId: [],
      };
      const userId = userData.uid;

      const userDocRef = doc(this.usersCollection, userId);
      const userDocSnap = await getDoc(userDocRef);

      if (!userDocSnap.exists()) {
        await setDoc(userDocRef, { ...userDraft, id: userId });
      }

      return true;
    });
    return from(promise);
  }

  logInWithEmailAndPassword(email: string, password: string): Observable<UserFire> {
    const promise = signInWithEmailAndPassword(this.auth, email, password);
    return from(promise).pipe(
      map((userCred) => userCred.user),
      catchError((error: unknown) => {
        if (error instanceof FirebaseError) {
          return throwError(() => new Error(`Ошибка при входе: ${error.message}`));
        }
        return throwError(() => new Error('Ошибка при входе'));
      }),
    );
  }

  logOut(): void {
    this.auth.signOut();
  }

  updateUser(userId: string, userData: Partial<User>): Observable<void> {
    const docRef = doc(this.usersCollection, userId);
    const promise = updateDoc(docRef, { ...userData });
    return from(promise);
  }

  getUserById(userId: string): Observable<User> {
    const docRef = doc(this.usersCollection, userId);
    const promise = getDoc(docRef);
    return from(promise).pipe(
      map((docSnapshot) => {
        const data = docSnapshot.data();
        return { ...data, id: docSnapshot.id } as User;
      }),
    );
  }
}
