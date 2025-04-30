import React from "react";
import ExitTestIcon from "../../../components/exit-test-icon";
import QuestionsCounter from "./questions-counter";
import { toggleFunctionProp } from "../types/index"
import styles from "../../../styles-pages/module-practice.module.css"

const HeaderTest = ({ toggleModulePractice }: toggleFunctionProp) => {
    return <>
        <ExitTestIcon showConfirmMessage={toggleModulePractice}></ExitTestIcon>
        <div className={styles["title-test"]}>
            <h1>PRÁCTICA MODULO 1</h1>
        </div>
        <div className={styles["question-counter"]}>
            <QuestionsCounter />
        </div>
    </>
}

export default HeaderTest;