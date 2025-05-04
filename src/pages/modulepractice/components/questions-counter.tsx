import React from "react";
import styles from "../../../styles-pages/module-practice.module.css"

const QuestionsCounter = ({totalQuestions, currentQuestion} : {totalQuestions : number, currentQuestion: number}) => {
    return <>
        <small className={styles["question-counter-text"]}>Pregunta {currentQuestion + 1}/{totalQuestions}</small>
    </>
}

export default QuestionsCounter;