
export enum Category {
  ACTION_DELAY = 'Action vs Delay',
  COMFORT_GROWTH = 'Comfort vs Growth',
  CONTROL_TRUST = 'Control vs Trust',
  PRESSURE_RESPONSE = 'Pressure Response',
  LOGIC_INTUITION = 'Logic vs Intuition'
}

export interface Choice {
  text: string;
  trait: string;
}

export interface Question {
  id: string;
  category: Category;
  text: string;
  optionA: Choice;
  optionB: Choice;
  timeLimit: number;
}

export interface UserDecision {
  questionId: string;
  choice: string;
  timeTaken: number;
  category: Category;
  timedOut: boolean;
}

export interface AnalysisResult {
  userName: string;
  fiveWordProfile: string;
  title: string;
  description: string;
  scores: {
    name: string;
    value: number;
    fullMark: number;
  }[];
  geminiProfile?: string;
}
