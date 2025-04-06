import React from "react";
import styles from "./checkTestSimulation.module.css"
import { useNavigate } from "react-router-dom";

const TestResults = ({results, total} : {results: number, total: number}) => {

    const navigate = useNavigate();

    const goHome = () => {
        sessionStorage.clear();
        navigate("/");
    };

    return <>
        <div className={styles["test-results-main-container"]}>
            <h2>Resultados Test</h2>
            <div className={styles["results-data-container"]}>
                <p>Cantidad de aciertos: {results}</p>
                <p>Cantidad de fallos: {total - results}</p>
            </div>
            <div className={styles["go-home-button"]}>
                <button onClick={goHome}>
                    <i className="bi bi-house-door"></i>
                    <small>Volver al Home</small>
                </button>
            </div>
        </div>
    </>
};

export default TestResults;