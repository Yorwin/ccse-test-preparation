import React, { useEffect } from "react";
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
}

const SimulationResultQuestions = ({ questionData }: SimulationResultQuestionsProps) => {

    const getQuestionData = () => {
        console.log(questionData);
    }

    useEffect(() => {
        getQuestionData();
    }, []);

    return (
        <ul className={styles["question-list"]}>

            {questionData.module1.map((e, index) => {

                const respuestas = e.respuestas || [];

                return (
                    <li key={index}>
                        <p className={styles["question-parragraph"]}> <small className={styles["question-number"]}>{index + 1}</small>{e.pregunta}</p>
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
            })}
        </ul>
    )
};

export default SimulationResultQuestions;