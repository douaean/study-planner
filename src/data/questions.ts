export type QuizQuestion = {
  title: string;
  options: string[];
  correctAnswer: string;
};

export const quizQuestions: QuizQuestion[] = [
  {
    title: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "Highly Technical Markup Language",
      "HyperLinks and Text Markup Language",
      "Hyper Tool Markup Language",
    ],
    correctAnswer: "Hyper Text Markup Language",
  },
  {
    title: "Which language is primarily used for styling web pages?",
    options: ["HTML", "Python", "CSS", "JavaScript"],
    correctAnswer: "CSS",
  },
  {
    title: "In programming, what is a 'bug'?",
    options: [
      "A feature that's not documented",
      "An error in a program",
      "A type of time",
      "An internet crawler",
    ],
    correctAnswer: "An error in a program",
  },
  {
    title: "What is the purpose of a 'for loop' in programming?",
    options: [
      "To repeat a block of code a limited number of times",
      "To style a webpage",
      "To declare variables",
      "To create a new function",
    ],
    correctAnswer: "To repeat a block of code a limited number of times",
  },
  {
    title: "Which symbol is used to denote an ID selector in CSS?",
    options: ["#", ".", "!", "@"],
    correctAnswer: "#",
  },
];

// Additional information
export const schoolInfo = {
  name: "ISGA Casablanca",
  description: "Quiz application for ISGA Casablanca programming course",
};

// Backwards-compatible export for existing imports
export const QUESTIONS = quizQuestions.map((q) => ({ question: q.title, options: q.options }));
