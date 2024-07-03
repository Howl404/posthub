import { Upvote } from './upvote.model';

export interface Post {
  authorName: string;
  location: string;
  id: string;
  title: string;
  description: string;
  upvotes: number;
  date: Date;
  upvotesByDay: Upvote[];
  commentsAmount: number;
}

export type PostDraft = Omit<Post, 'id'>;
