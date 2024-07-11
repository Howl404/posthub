import { Notification, NotificationDTO } from './notification';

export interface User {
  id: string;
  name: string;
  email: string;
  gender: string;
  dob: string;
  subscribed: boolean;
  upvotedPostsId: string[];
  joinedCommunitiesId: string[];
  notifications: Notification[];
}

export interface UserDTO extends Omit<User, 'notifications'> {
  notifications: NotificationDTO[];
}

export type UserDraft = Omit<User, 'id'>;
