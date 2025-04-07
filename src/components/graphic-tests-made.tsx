import React from "react";
import styles from "./graphic-test-made.module.css"

const GraphicTestsMade = () => {
    return <>
        <div className={styles["main-container-tests"]}>
            <div className={styles["data-container"]}>
                <h2>Pruebas CCSE realizadas</h2>
                <small>28</small>
            </div>
            <div className={styles["shared-data-container"]}>
                <div className="first-item">
                    <h2>Apto</h2>
                    <small>28</small>
                </div>
                <div className="second-item">
                    <h2>No Apto</h2>
                    <small>0</small>
                </div>
            </div>
        </div>
    </>
};

export default GraphicTestsMade;