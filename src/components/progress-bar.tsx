import React from "react";
import styles from "./progress-bar.module.css"

const ProgressBar = ({progress}: {progress: string}) => {
    return <>
        <div className={styles["progress-bar-container"]}>
            <div className={styles["progress-bar"]}
            style={{ width : `${progress}`}}></div>
        </div>
    </>
};

export default ProgressBar;