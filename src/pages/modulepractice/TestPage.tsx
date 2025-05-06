import React, { useEffect, useState } from "react";
import styles from "../../styles-pages/module-practice.module.css"
import Header from "./components/header-test";
import LeaveTest from "./components/leaveTestConfirmation"
import TestResultsPage from "./components/testResultsPage";
import { saveModulePractice } from "../../config/firebase";
import { verifiedAnswersBeforeResults } from "../../types";
import { auth, db } from "../../config/firebase";
import { collection, getDocs } from "firebase/firestore";

interface TestPageProps {
    toggleModulePractice: () => void;
    moduleNumber: number;
}

type QAEntry = {
    [key: string]: string | number;
}

interface questionType {
    correcta: number,
    pregunta: string,
    respuestas: string[],
}

const TestPage = ({ toggleModulePractice, moduleNumber }: TestPageProps) => {

    const [isQuestionChecked, setIsQuestionChecked] = useState(false);
    const [loading, setIsLoading] = useState(true);

    const [questions, setQuestions] = useState<questionType[]>([]);
    const [totalAmountOfQuestions, setTotalAmountOfQuestions] = useState(0);
    const [userWantsToLeave, setUserWantsToLeave] = useState(false)
    const [questionCounter, setQuestionCounter] = useState<number>(
        () => Number(sessionStorage.getItem('current_question')) || 0
    );
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [showTestResults, setShowTestResults] = useState(false);
    const [arrayQuestionsAndAnswers, setArrayQuestionsAndAnswers] = useState<QAEntry[]>([]);

    const user = auth.currentUser;

    if (!user) {
        throw new Error("Usuario no autenticado");
    }

    const finishModulePractice = async (lastQuestion: string, lastAnswer: number | string | null) => {
        try {

            if (lastAnswer === null) {
                return lastAnswer = "Pregunta no respondida"
            }

            const newEntry = {
                [lastQuestion]: lastAnswer,
            };

            const updatedArray = [...arrayQuestionsAndAnswers, newEntry];
            setArrayQuestionsAndAnswers(updatedArray);
            saveQuestionInMemory(updatedArray);

            const score = await calculateModulePracticeScore();

            const params = {
                testId: "module-practice",
                answers: updatedArray,
            }

            const storedAnswers = sessionStorage.getItem("respuestas");
            let answers;

            if (storedAnswers !== null) {
                answers = JSON.parse(storedAnswers);
            } else {
                console.warn("No se encontraron respuestas en sessionStorage");
            }

            saveQuestionsInServer("module-practice", score, answers)
            setShowTestResults(true);
        } catch (error) {
            console.error("Error al guardar las preguntas" + error);
        }
    };

    const calculateModulePracticeScore = async () => {
        const storedAnswers = sessionStorage.getItem("respuestas");
        let score = 0;

        if (!storedAnswers) {
            console.log("No se encontraron respuestas en sessionStorage");
            return 0;
        }

        const userAnswers = JSON.parse(storedAnswers);

        userAnswers.forEach((userAnswerObj: Record<string, number>) => {
            const [questionText, selectedAnswerIndex] = Object.entries(userAnswerObj)[0];

            const questionMatch = questions.find(q => q.pregunta === questionText);

            if (questionMatch && questionMatch.correcta === selectedAnswerIndex) {
                score += 1;
            }
        });

        return score;
    };

    const saveQuestionsInServer = (testId: string, score: number, answers: verifiedAnswersBeforeResults[]) => {

        const param = {
            testId: testId,
            score: score,
            answers: answers,
        }
        
        saveModulePractice(param);
    };

    const goBackToHome = () => {
        setShowTestResults(e => !e);
    };

    const checkQuestion = () => {
        setIsQuestionChecked(e => !e);
    }

    const saveQuestionInMemory = (value: any) => {
        sessionStorage.setItem("respuestas", `${JSON.stringify(value)}`);
    };

    const continueWithNextQuestion = (key: string, value: number | null | string) => {

        if (value === null) {
            return value = "Pregunta no respondida"
        }

        const newEntry = {
            [key]: value,
        };

        const updatedArray = [...arrayQuestionsAndAnswers, newEntry];
        setArrayQuestionsAndAnswers(updatedArray);

        setQuestionCounter((e: number) => {
            const currentQuestion = e + 1;
            sessionStorage.setItem("current_question", `${currentQuestion}`);
            return e + 1;
        })

        saveQuestionInMemory(updatedArray);
        setIsQuestionChecked(false);
        setSelectedAnswer(null);
    };

    const saveQuestionInCaseOfReload = (questions: any) => {
        sessionStorage.setItem("questions", JSON.stringify(questions));
    };

    const toggleLeaveTestMessage = () => {
        setUserWantsToLeave(e => !e);
    };

    const handleAnswerSelection = (index: number) => {
        setSelectedAnswer(index);
    };

    const getModuleQuestions = async () => {
        try {
            setIsLoading(true);
            const savedQuestionsStr = sessionStorage.getItem("questions");

            if (savedQuestionsStr) {
                const savedQuestions = JSON.parse(savedQuestionsStr);
                setQuestions(savedQuestions);
                setTotalAmountOfQuestions(savedQuestions.length);
                setIsLoading(false);
                return;
            }

            const moduleQuestions: questionType[] = [];

            const questionsInModuleRef = collection(db, "preguntas", `Modulo_${moduleNumber}`, "preguntas");
            const questionsSnap = await getDocs(questionsInModuleRef);

            questionsSnap.forEach((doc) => {
                const data = doc.data();

                const dataInCorrectFormat = {
                    correcta: data.correcta,
                    pregunta: data.pregunta,
                    respuestas: data.respuestas,
                }

                moduleQuestions.push(dataInCorrectFormat);
            });

            setQuestions(moduleQuestions);
            saveQuestionInCaseOfReload(moduleQuestions);
            setTotalAmountOfQuestions(moduleQuestions.length);
        } catch (error) {
            console.error(`Error al intentar obtener las preguntas: ${error}`);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getModuleQuestions();
    }, [moduleNumber]); 

    const renderCurrentQuestion = () => {
        if (loading || questions.length === 0 || questionCounter >= questions.length) {
            return <div className={styles["loading"]}>Cargando...</div>;
        }

        const currentQuestion = questions[questionCounter];
        const isCorrect = selectedAnswer === currentQuestion.correcta;

        return (
            <div className={styles["question-container"]}>
                <div className={styles["question-content-container"]}>
                    <div className={styles["question-title"]}>
                        {isQuestionChecked && (
                            <div className={styles["answer-state"]}>
                                <small>{isCorrect ? "Correcto!" : "Incorrecto"}</small>
                            </div>
                        )}
                        <h3>{currentQuestion.pregunta}</h3>
                    </div>
                    <div className="question-answers-container">
                        {currentQuestion.respuestas.map((answer, index) => (
                            <div
                                className={styles["answer-container"]}
                                key={`${questionCounter}_${index}_answers`}
                            >
                                <input
                                    type="radio"
                                    className={styles["radio-style"]}
                                    name={`radio-question-${questionCounter}`}
                                    id={`radio-question-${questionCounter}-${index}`}
                                    checked={selectedAnswer === index}
                                    onChange={() => handleAnswerSelection(index)}
                                />
                                <label htmlFor={`radio-question-${questionCounter}-${index}`}>{answer}</label>

                                {isQuestionChecked && (
                                    index === currentQuestion.correcta ? (
                                        <div className={`${styles["correct-answer-icon-container"]} ${selectedAnswer === index ? styles["selected-answer"] : styles["not-selected-answer"]}`}>
                                            <i className="bi bi-check-lg"></i>
                                        </div>
                                    ) : (
                                        <div className={`${styles["wrong-answer-icon-container"]} ${selectedAnswer === index ? styles["selected-answer"] : styles["not-selected-answer"]}`}>
                                            <i className="bi bi-x"></i>
                                        </div>
                                    )
                                )}
                            </div>
                        ))}
                    </div>
                    <div className={styles["button-container"]}>
                        {isQuestionChecked ? (
                            <>
                                {questionCounter === questions.length - 1 ? (
                                    <button onClick={() => {
                                        finishModulePractice(currentQuestion.pregunta, selectedAnswer);
                                    }}>Finalizar  Prueba</button>
                                ) : (
                                    <button onClick={() => continueWithNextQuestion(currentQuestion.pregunta, selectedAnswer)}>Siguiente Pregunta</button>)
                                }
                            </>
                        ) : (
                            <button onClick={checkQuestion} disabled={selectedAnswer === null}>Comprobar</button>
                        )}
                    </div>
                </div>
            </div>
        )
    };

    return (
        <div className={styles["main-container-test"]}>
            {showTestResults ? (
                <TestResultsPage goBackToHome={goBackToHome} />
            ) : (
                <>
                    {userWantsToLeave && (
                        <LeaveTest
                            toggleModulePractice={toggleModulePractice}
                            toggleLeaveTestMessage={toggleLeaveTestMessage}
                        />
                    )}

                    <div className={styles["header-container"]}>
                        <Header
                            totalAmountOfQuestions={totalAmountOfQuestions}
                            moduleSelected={moduleNumber}
                            toggleLeaveTestMessage={toggleLeaveTestMessage}
                            currentQuestion={questionCounter}
                        />
                    </div>

                    {renderCurrentQuestion()}

                    <div className={styles["finish-practice-container"]}>
                        <button className={styles["finish-practice-button"]}>
                            Terminar Práctica
                        </button>
                    </div>
                </>
            )}
        </div>
    );

};

export default TestPage;