import React from "react";
import styles from "../components/progress-next-back-results.module.css"

const ProgressNextBack = () => {
    return <>
        <div className={styles["arrow-back"]}>
            <i className="bi bi-caret-left"></i>
        </div>
        <div className={styles["progress-container"]}>
            <div className={styles["progress-circle"]}></div>
            <div className={styles["progress-circle"]}></div>
            <div className={styles["progress-circle"]}></div>
            <div className={styles["progress-circle"]}></div>
            <div className={styles["progress-circle"]}></div>
        </div>
        <div className={styles["arrow-next"]}>
            <i className="bi bi-caret-right"></i>
        </div>
    </>
};

export default ProgressNextBack;