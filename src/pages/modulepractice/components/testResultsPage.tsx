import React from "react";
import styles from "../styles/test-results-page.module.css"

interface TestResultsProps {
    goBackToHome: () => void;
}

const TestResultsPage = ({ goBackToHome }: TestResultsProps) => {
    return (
        <div className={styles["main-container-test-results"]}>
            <div className={styles["title-results"]}>
                <h2>Resultados del test</h2>
            </div>
            <div className={styles["test-results"]}>
                <p>Se han acertado 15/100 preguntas</p>
                <button>Si te gustaría ver un reporte de las preguntas que has respondido incorrectamente, Haz click aquí</button>
            </div>
            <div className={styles["go-back-home-button"]}>
                <button onClick={goBackToHome}>Go Back</button>
            </div>
        </div>
    )
};

export default TestResultsPage;