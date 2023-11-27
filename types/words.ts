export interface Definition {
  _id: string;
  meaning: string;
  examples: string[];
  reviews: number;
}

export interface Word {
  _id: string;
  userId: string;
  word: string;
  definitions: Definition[];
}

export interface ReviewWord extends Partial<Omit<Word, "definitions">> {
  definition: Partial<Definition>;
}
