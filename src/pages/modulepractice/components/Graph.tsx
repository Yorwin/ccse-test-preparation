import React from "react";
import ColumnChart from "./ColumnChart";
import styles from "../../../styles-pages/module-practice.module.css"

const Graph = () => {
    return (
        <div className={styles["graph-container"]}>
            <div className={styles["title-container"]}>
                <h2>Grado de Preparación por Modulo</h2>
            </div>
            <ColumnChart />
        </div>
    )
};

export default Graph;