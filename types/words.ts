export interface Definition {
  _id?: string;
  type: string;
  definition: string;
  examples: string[];
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
