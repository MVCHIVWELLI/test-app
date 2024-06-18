
export type QuestionType = 'single' | 'multiple' | 'short' | 'long';

export interface Question {
  id: string;
  type: QuestionType;
  question: string;
  options?: string[];
  answer?: string | string[];
}

export interface Test {
  id: string;
  title: string;
  questions: Question[];
  timeLimit: number; // in minutes
}