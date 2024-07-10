export interface Notification {
  text: string;
  type: NotificationType;
  link: string;
  date: Date;
}

export interface NotificationDTO extends Omit<Notification, 'date'> {
  date: number;
}

export enum NotificationType {
  Error = 'error',
  Info = 'info',
}
