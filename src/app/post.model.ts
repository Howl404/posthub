export interface Post {
  location: string;
  id: string;
  title: string;
  description: string;
  upvotes: number;
  date: string;
  upvotesByDay: {
    day: string;
    upvotes: number;
  }[];
  commentsId: string[];
}

export type PostDraft = Omit<Post, 'id'>;
