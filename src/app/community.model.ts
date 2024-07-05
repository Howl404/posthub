export interface Community {
  id: string;
  name: string;
  backgroundColor: string;
  joinedAmount: number;
  ownerId: string;
  moderatorsNames: string[];
}

export type CommunityDraft = Omit<Community, 'id'>;
