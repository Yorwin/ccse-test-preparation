import React from "react";
import Header from "./components/header"
import ModuleContent from "./components/module-content";
import Graph from "./components/Graph";
import styles from "../../styles-pages/module-practice.module.css"

const ModulePractice = () => {
    return <>
        <div className={styles["main-container-module-practice"]}>
            <Header />
            <ModuleContent />
            <div className={styles["divisor-line-container"]}>
                <div className={styles["divisor-line"]}></div>
            </div>
            <Graph />
        </div>
    </>
};

export default ModulePractice;