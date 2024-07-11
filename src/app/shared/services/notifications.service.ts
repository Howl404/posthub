import { inject, Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { NotificationDTO, Notification } from '../models/notification';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  readonly firestore = inject(Firestore);

  private readonly usersCollection = collection(this.firestore, 'users');

  addNotification(userId: string, notification: Notification): Observable<void> {
    const notificationDTO: NotificationDTO = {
      ...notification,
      date: notification.date.getTime(),
    };
    const docRef = doc(this.usersCollection, userId);
    const promise = updateDoc(docRef, { notifications: arrayUnion(notificationDTO) });
    return from(promise);
  }

  removeNotification(userId: string, notification: Notification): Observable<void> {
    const notificationDTO: NotificationDTO = {
      ...notification,
      date: notification.date.getTime(),
    };
    const docRef = doc(this.usersCollection, userId);
    const promise = updateDoc(docRef, { notifications: arrayRemove(notificationDTO) });
    return from(promise);
  }
}
