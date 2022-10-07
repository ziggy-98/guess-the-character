export interface Round {
  character: {
    name: string;
    image: string;
  };
  options: string[];
  correctAnswer: string;
}

export interface EmptyRound {
  character?: {
    name?: string;
    image?: string;
  };
  options?: string[];
  correctAnswer?: string;
}
