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

export interface verifiedAnswersBeforeResults {
    [code: string]: number;
}

export interface SaveResults {
    testId : string,
    score : number, 
    answers : verifiedAnswersBeforeResults[];
    duration : number,
    questions : string[],
}

export type SaveResultsModulePractice = (testId : string, score : number, answers : verifiedAnswersBeforeResults[], module_number: string | null) => Promise<string>;

export interface getResult {
    id: string;
    testId?: string; // testId es opcional
    fecha?: string;
    [key: string]: any; // Para permitir otros campos dinámicos
}
