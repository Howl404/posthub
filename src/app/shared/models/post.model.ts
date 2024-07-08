import { Upvote, UpvoteDTO } from './upvote.model';

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

export interface PostDTO extends Omit<Post, 'upvotesByDay' | 'date'> {
  upvotesByDay: UpvoteDTO[];
  date: number;
}

export type PostDraft = Omit<Post, 'id'>;
