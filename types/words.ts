export interface Definition {
  _id: string;
  wordId: string;
  type: string;
  usageLabel?: string;
  definition: string;
  isBookmarked: boolean;
}

export interface Word {
  _id: string;
  word: string;
  article: string;
  tags: string;
  definitions: Definition[];
  examples: string[];
}

export interface ReviewWord extends Partial<Omit<Word, "definitions">> {
  definition: Partial<Definition>;
}
