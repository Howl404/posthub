export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  gender: string;
  dob: string;
  subscribed: boolean;
  commentsId: string[];
  postsId: string[];
  joinedCommunitiesId: string[];
}

export type UserDraft = Omit<User, 'id'>;
