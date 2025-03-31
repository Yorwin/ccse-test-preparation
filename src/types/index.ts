export interface Question {
    id: string;
    text: string;
    options: string[];
    correctOption?: number;
}

export interface TestState {
    questions : Question[],
    answers : Record<string, number>,
    remainingTime : number,
    sessionId : string,
    startTime : number, 
}