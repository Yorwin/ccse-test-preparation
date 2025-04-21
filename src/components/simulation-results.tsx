import React from "react";
import TaskControl from "./TaskControl";
import ProgressNextBack from "./progress-next-back-results";
import styles from '../styles-pages/results.module.css'

interface historyProps {
    showSimulationResult: () => void;
}

const SimulationResults = ({ showSimulationResult }: historyProps) => {
    return <>
        <div className={styles["simulation-results-container"]}>
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
    </>
};

export default SimulationResults;