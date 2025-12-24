
import { Category, Question } from './types';

export const QUESTIONS: Question[] = [
  // ACTION vs DELAY
  { id: 'q1', category: Category.ACTION_DELAY, text: "You have an idea. Act now or wait to refine?", optionA: { text: "Act now", trait: "Action-Oriented" }, optionB: { text: "Wait to refine", trait: "Cautious" }, timeLimit: 8 },
  { id: 'q2', category: Category.ACTION_DELAY, text: "Message needs a reply. Respond immediately or later?", optionA: { text: "Reply now", trait: "Action-Oriented" }, optionB: { text: "Reply later", trait: "Hesitant" }, timeLimit: 6 },
  { id: 'q3', category: Category.ACTION_DELAY, text: "Small mistake noticed. Fix it now or ignore it?", optionA: { text: "Fix now", trait: "Action-Oriented" }, optionB: { text: "Ignore", trait: "Delay-Prone" }, timeLimit: 7 },
  { id: 'q4', category: Category.ACTION_DELAY, text: "A door is closing. Run for it or wait for the next?", optionA: { text: "Run for it", trait: "Action-Oriented" }, optionB: { text: "Wait", trait: "Patient" }, timeLimit: 5 },
  { id: 'q5', category: Category.ACTION_DELAY, text: "New task arrives. Start immediately or schedule it?", optionA: { text: "Start now", trait: "Impulsive" }, optionB: { text: "Schedule", trait: "Planner" }, timeLimit: 6 },

  // COMFORT vs GROWTH
  { id: 'q6', category: Category.COMFORT_GROWTH, text: "Stay comfortable or try something uncertain?", optionA: { text: "Stay comfortable", trait: "Stability" }, optionB: { text: "Try uncertain", trait: "Growth" }, timeLimit: 8 },
  { id: 'q7', category: Category.COMFORT_GROWTH, text: "Repeat what works or experiment?", optionA: { text: "Repeat", trait: "Stability" }, optionB: { text: "Experiment", trait: "Growth" }, timeLimit: 7 },
  { id: 'q8', category: Category.COMFORT_GROWTH, text: "Master one skill or be a novice in three?", optionA: { text: "Master one", trait: "Specialist" }, optionB: { text: "Novice in three", trait: "Generalist" }, timeLimit: 8 },
  { id: 'q9', category: Category.COMFORT_GROWTH, text: "Predictable routine or unexpected adventure?", optionA: { text: "Routine", trait: "Stability" }, optionB: { text: "Adventure", trait: "Growth" }, timeLimit: 7 },
  { id: 'q10', category: Category.COMFORT_GROWTH, text: "Safety in numbers or go it alone?", optionA: { text: "Numbers", trait: "Safety" }, optionB: { text: "Alone", trait: "Growth" }, timeLimit: 6 },

  // CONTROL vs TRUST
  { id: 'q11', category: Category.CONTROL_TRUST, text: "Do it yourself or delegate?", optionA: { text: "Do it myself", trait: "Perfectionist" }, optionB: { text: "Delegate", trait: "Adaptive" }, timeLimit: 8 },
  { id: 'q12', category: Category.CONTROL_TRUST, text: "Plan everything or adapt as you go?", optionA: { text: "Plan", trait: "Control" }, optionB: { text: "Adapt", trait: "Adaptive" }, timeLimit: 6 },
  { id: 'q13', category: Category.CONTROL_TRUST, text: "Micromanage the details or trust the process?", optionA: { text: "Micromanage", trait: "Control" }, optionB: { text: "Trust", trait: "Adaptive" }, timeLimit: 7 },
  { id: 'q14', category: Category.CONTROL_TRUST, text: "Follow the manual or find your own way?", optionA: { text: "Manual", trait: "Control" }, optionB: { text: "Own way", trait: "Instinct" }, timeLimit: 7 },
  { id: 'q15', category: Category.CONTROL_TRUST, text: "Own the failure or share the credit?", optionA: { text: "Own failure", trait: "Extreme Control" }, optionB: { text: "Share credit", trait: "Collaborative" }, timeLimit: 8 },

  // PRESSURE RESPONSE
  { id: 'q16', category: Category.PRESSURE_RESPONSE, text: "Time is running out. Choose.", optionA: { text: "Quickly", trait: "Calm" }, optionB: { text: "Freeze", trait: "Panic" }, timeLimit: 5 },
  { id: 'q17', category: Category.PRESSURE_RESPONSE, text: "Incoming deadline. Rush or stay methodical?", optionA: { text: "Rush", trait: "Hustle" }, optionB: { text: "Methodical", trait: "Stable" }, timeLimit: 5 },
  { id: 'q18', category: Category.PRESSURE_RESPONSE, text: "Crisis occurs. Lead or follow instructions?", optionA: { text: "Lead", trait: "Assertive" }, optionB: { text: "Follow", trait: "Reliable" }, timeLimit: 6 },
  { id: 'q19', category: Category.PRESSURE_RESPONSE, text: "The alarm sounds. Evacuate or verify?", optionA: { text: "Evacuate", trait: "Instinct" }, optionB: { text: "Verify", trait: "Analytical" }, timeLimit: 5 },
  { id: 'q20', category: Category.PRESSURE_RESPONSE, text: "A sudden split path. Left or Right?", optionA: { text: "Left", trait: "Intuitive" }, optionB: { text: "Right", trait: "Intuitive" }, timeLimit: 4 },

  // LOGIC vs INTUITION
  { id: 'q21', category: Category.LOGIC_INTUITION, text: "Trust the data or trust your gut?", optionA: { text: "Data", trait: "Logical" }, optionB: { text: "Gut", trait: "Intuitive" }, timeLimit: 8 },
  { id: 'q22', category: Category.LOGIC_INTUITION, text: "Analyze the pros/cons or feel the 'vibe'?", optionA: { text: "Analyze", trait: "Logical" }, optionB: { text: "Vibe", trait: "Intuitive" }, timeLimit: 7 },
  { id: 'q23', category: Category.LOGIC_INTUITION, text: "A mystery gift. Open it or research it?", optionA: { text: "Open it", trait: "Intuitive" }, optionB: { text: "Research", trait: "Logical" }, timeLimit: 6 },
  { id: 'q24', category: Category.LOGIC_INTUITION, text: "Pick a color. Sharp Blue or Deep Red?", optionA: { text: "Sharp Blue", trait: "Logical" }, optionB: { text: "Deep Red", trait: "Emotional" }, timeLimit: 5 },
  { id: 'q25', category: Category.LOGIC_INTUITION, text: "The final step. Double-check or Submit?", optionA: { text: "Double-check", trait: "Logical" }, optionB: { text: "Submit", trait: "Decisive" }, timeLimit: 7 }
];
