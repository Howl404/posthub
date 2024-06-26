export interface Community {
  id: string;
  name: string;
  backgroundColor: string;
  joinedAmount: number;
  postsId: string[];
}

export type CommunityDraft = Omit<Community, 'id'>;
