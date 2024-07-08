export interface User {
  id: string;
  name: string;
  email: string;
  gender: string;
  dob: string;
  subscribed: boolean;
  upvotedPostsId: string[];
  moderatingCommunitiesId: string[];
  joinedCommunitiesId: string[];
}

export type UserDraft = Omit<User, 'id'>;
