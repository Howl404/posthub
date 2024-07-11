export interface Upvote {
  date: Date;
  amount: number;
}
export interface UpvoteDTO extends Omit<Upvote, 'date'> {
  date: number;
}
