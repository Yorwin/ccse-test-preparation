import React from "react";
import styles from "../styles-pages/results.module.css"

const ControlBar = () => {
    return (
        <div className={styles["questions-control-bar"]}>
            <div className={styles["right-item"]}>
                <i className="bi bi-check-lg"></i>
            </div>
            <div className={styles["wrong-item"]}>
                <i className="bi bi-x"></i>
            </div>
            <div className={styles["right-item"]}>
                <i className="bi bi-check-lg"></i>
            </div>
            <div className={styles["wrong-item"]}>
                <i className="bi bi-x"></i>
            </div>
            <div className={styles["right-item"]}>
                <i className="bi bi-check-lg"></i>
            </div>
            <div className={styles["wrong-item"]}>
                <i className="bi bi-x"></i>
            </div>
            <div className={styles["right-item"]}>
                <i className="bi bi-check-lg"></i>
            </div>
            <div className={styles["right-item"]}>
                <i className="bi bi-check-lg"></i>
            </div>
            <div className={styles["right-item"]}>
                <i className="bi bi-check-lg"></i>
            </div>
            <div className={styles["right-item"]}>
                <i className="bi bi-check-lg"></i>
            </div>
        </div>
    )
};

export default ControlBar;