export interface Comment {
  id: string;
  text: string;
  author: string;
  location: string;
  date: Date;
}

export type CommentDraft = Omit<Comment, 'id'>;
