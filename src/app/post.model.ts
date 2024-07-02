export interface Post {
  authorName: string;
  location: string;
  id: string;
  title: string;
  description: string;
  upvotes: number;
  date: Date;
  upvotesByDay: {
    day: string;
    upvotes: number;
  }[];
  commentsAmount: number;
}

export type PostDraft = Omit<Post, 'id'>;
