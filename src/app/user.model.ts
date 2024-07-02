export interface User {
  id: string;
  name: string;
  email: string;
  gender: string;
  dob: string;
  subscribed: boolean;
  moderatingCommunitiesId: string[];
  commentsId: string[];
  postsId: string[];
  joinedCommunitiesId: string[];
}

export type UserDraft = Omit<User, 'id'>;
