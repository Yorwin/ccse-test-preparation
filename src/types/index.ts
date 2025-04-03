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

export type AnswersResults = {
    question : string, 
    answer : number,
}

export interface SaveResults {
    testId : string,
    score : number, 
    answers : AnswersResults[];
    duration : number,
}

export interface getResult {
    id: string;
    testId?: string; // testId es opcional
    fecha?: string;
    [key: string]: any; // Para permitir otros campos dinámicos
}
