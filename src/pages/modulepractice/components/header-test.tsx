import React from "react";
import ExitTestIcon from "../../../components/exit-test-icon";
import QuestionsCounter from "./questions-counter";
import styles from "../styles/test-page.module.css"

interface HeaderTest {
    totalAmountOfQuestions : number,
    moduleSelected : number,
    toggleLeaveTestMessage : () => void,
    currentQuestion : number,
}

const HeaderTest = ({ totalAmountOfQuestions, moduleSelected, toggleLeaveTestMessage, currentQuestion }: HeaderTest) => {
    return <>
        <ExitTestIcon showConfirmMessage={toggleLeaveTestMessage}></ExitTestIcon>
        <div className={styles["title-test"]}>
            <h1>PRÁCTICA MODULO {moduleSelected}</h1>
        </div>
        <div className={styles["question-counter"]}>
            <QuestionsCounter totalQuestions={totalAmountOfQuestions} currentQuestion={currentQuestion}  />
        </div>
    </>
}

export default HeaderTest;