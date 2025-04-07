import React from "react";
import styles from "./graphic-test-made.module.css"

const GraphicHoursSimulated = () => {
    return <>
        <div className={styles["main-container-tests"]}>
            <div className={styles["container-icon"]}>
                <i className="bi bi-stopwatch-fill"></i>
            </div>
            <div className={styles["total-hours"]}>
                <h3 className={styles["amount-hours"]}>3.5<small className={styles["text-hours"]}> horas </small></h3>
            </div>
            <p className={styles["parragraph-simulated-hours"]}>Total de horas simuladas</p>
        </div>
    </>
};

export default GraphicHoursSimulated;