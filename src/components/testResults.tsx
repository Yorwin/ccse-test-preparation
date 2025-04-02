import React from "react";
import styles from "./checkTestSimulation.module.css"
import { useNavigate } from "react-router-dom";

const TestResults = () => {

    const navigate = useNavigate();

    const goHome = () => {
        sessionStorage.clear();
        navigate("/");
    };

    return <>
        <div className={styles["test-results-main-container"]}>
            <h2>Resultados Test</h2>
            <div className={styles["results-data-container"]}>
                <p>Cantidad de aciertos: 23</p>
                <p>Cantidad de fallos: 2</p>
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