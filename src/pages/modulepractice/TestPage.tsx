import React, { useState } from "react";
import styles from "../../styles-pages/module-practice.module.css"
import { toggleFunctionProp } from "./types";
import Header from "./components/header-test"

const TestPage = ({ toggleModulePractice }: toggleFunctionProp) => {

    const [isQuestionChecked, setIsQuestionChecked] = useState(false);

    const checkQuestion = () => {
        setIsQuestionChecked(e => !e);
    }

    return <>
        <div className={styles["main-container-test"]}>
            <div className={styles["header-container"]}>
                <Header toggleModulePractice={toggleModulePractice} />
            </div>
            <div className={styles["question-container"]}>
                <div className={styles["question-content-container"]}>
                    <div className={styles["question-title"]}>
                        <div className={styles["answer-state"]}>
                            <small>Correcto!</small>
                        </div>
                        <h3>¿Que lengua es oficial en el País Vasco?</h3>
                    </div>

                    <div className="question-answers-container">
                        <div className={styles["answer-container"]}>
                            <input
                                type="radio"
                                className={styles["radio-style"]}
                                name={`radio-question`}
                                id={`radio-question`}
                                checked={false} />
                            <label htmlFor="radio-question">El Bable</label>
                        </div>
                        <div className={styles["answer-container"]}>
                            <input
                                type="radio"
                                className={styles["radio-style"]}
                                name={`radio-question`}
                                id={`radio-question`}
                                checked={true} />
                            <label htmlFor="radio-question">El Aragonés</label>
                            <div className={styles["wrong-answer-icon-container"]}>
                                <i className="bi bi-x"></i>
                            </div>
                        </div>
                        <div className={styles["answer-container"]}>
                            <input
                                type="radio"
                                className={styles["radio-style"]}
                                name={`radio-question`}
                                id={`radio-question`}
                                checked={false} />
                            <label htmlFor="radio-question">El Euskera</label>
                            <div className={styles["correct-answer-icon-container"]}>
                                <i className="bi bi-check-lg"></i>
                            </div>
                        </div>
                    </div>

                    <div className={styles["button-container"]}>
                        {isQuestionChecked ? <>
                            <button onClick={checkQuestion}>Finalizar</button>
                            <button onClick={checkQuestion}>Siguiente Pregunta</button>
                        </>
                            : <button onClick={checkQuestion}>Comprobar</button>}
                    </div>
                </div>
            </div>
            <div className={styles["finish-practice-container"]}>
                <button className={styles["finish-practice-button"]}>Terminar Práctica</button>
            </div>
        </div>
    </>
};

export default TestPage;