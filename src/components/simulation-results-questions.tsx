import React, { useEffect, useState } from "react";
import styles from "../styles-pages/results.module.css"

interface Questions {
    id?: string,
    pregunta?: string,
    respuestas?: string[],
    correcta?: number,
}

interface ModulesMap {
    [key: string]: Questions[]; // Cada módulo contiene un array de preguntas
}

interface SimulationResultQuestionsProps {
    questionData: ModulesMap;
    currentModule: number;
}

const SimulationResultQuestions = ({ questionData, currentModule }: SimulationResultQuestionsProps) => {

    const [moduleToBeShown, setModuleToBeShow] = useState<React.ReactElement>(<></>);

    const renderQuestionList = (moduleQuestions: any) => {
        return moduleQuestions.map((e: any, index: number) => {
            const respuestas = e.respuestas || [];

            return (
                <li key={index}>
                    <p className={styles["question-parragraph"]}>
                        <small className={styles["question-number"]}>{index + 1}</small>{e.pregunta}
                    </p>
                    <div className={styles["question-option-right"]}>
                        <i className="bi bi-check-lg"></i>
                        <p className={styles["text-option"]}>{respuestas[0] || 'Sin respuesta'}</p>
                    </div>
                    <div className={styles["question-option-wrong"]}>
                        <i className="bi bi-x"></i>
                        <p className={styles["text-option"]}>{respuestas[1] || 'Sin respuesta'}</p>
                    </div>
                    <div className={styles["question-option-wrong"]}>
                        <i className="bi bi-x"></i>
                        <p className={styles["text-option"]}>{respuestas[2] || 'Sin respuesta'}</p>
                    </div>
                </li>
            );
        });
    };

    const modulesList = [
        renderQuestionList(questionData.module1),
        renderQuestionList(questionData.module2),
        renderQuestionList(questionData.module3),
        renderQuestionList(questionData.module4),
        renderQuestionList(questionData.module5)
    ];

    useEffect(() => {
        if (currentModule >= 0) {
            setModuleToBeShow(modulesList[currentModule]);
        }
    }, [currentModule]);

    return (
        <ul className={styles["question-list"]}>
            {moduleToBeShown}
        </ul>
    )
};

export default SimulationResultQuestions;