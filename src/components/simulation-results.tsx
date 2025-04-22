import React from "react";
import TaskControl from "./TaskControl";
import ProgressNextBack from "./progress-next-back-results";
import SimulationResultQuestions from "./simulation-results-questions";
import ControlBar from "./simulation-results-control-bar";
import styles from '../styles-pages/results.module.css'

interface historyProps {
    showSimulationResult: () => void;
}

const SimulationResults = ({ showSimulationResult }: historyProps) => {
    return <>
        <div className={styles["simulation-results-container"]}>
            <div className={styles["header-container"]}>
                <div>
                    <button onClick={showSimulationResult} className={styles["exit-test-icon"]}>
                        <i className="bi bi-x-circle-fill"></i>
                    </button>
                </div>
                <div className={styles["check-answers-container"]}>
                    <h1 className={styles["title-check-answers"]}>Revisar respuestas</h1>
                    <ProgressNextBack />
                </div>
                <TaskControl taskCounter={0} />
            </div>
            <div className={styles["question-container"]}>
                <SimulationResultQuestions />
            </div>
            <ControlBar />
        </div>
    </>
};

export default SimulationResults;