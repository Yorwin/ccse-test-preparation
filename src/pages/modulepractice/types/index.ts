import { verifiedAnswersBeforeResults } from "../../../types";

export interface toggleFunctionProp {
    toggleModulePractice: () => void;
}

type SavedQuestionValue = number | string | null;

export type QAEntry = {
    [key: string]: string | number;
}

export interface questionType {
    correcta: number,
    pregunta: string,
    respuestas: string[],
}

export type saveQuestionAnswerLocally = (key: string, value: SavedQuestionValue) => void;
export type saveAnswersInServer = (key: string, value: SavedQuestionValue) => void;
export type saveQuestionsInServer = (testId: string, score: number, answers: verifiedAnswersBeforeResults[]) => void;