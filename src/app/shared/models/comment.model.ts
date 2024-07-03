export interface Comment {
  id: string;
  text: string;
  author: string;
  location: string;
}

export type CommentDraft = Omit<Comment, 'id'>;
