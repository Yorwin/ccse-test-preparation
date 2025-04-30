import React, { useState } from "react";
import Header from "./components/header"
import ModuleContent from "./components/module-content";
import Graph from "./components/Graph";
import TestPage from "./TestPage";
import styles from "../../styles-pages/module-practice.module.css"

const ModulePractice = () => {

    const [startedModulePractice, setStartedModulePractice] = useState(false);

    const toggleStartedModulePractice = () => {
        setStartedModulePractice(e => !e);
    }

    return <>
        <div className={styles["main-container-module-practice"]}>
            {startedModulePractice ? <TestPage toggleModulePractice={toggleStartedModulePractice}/> :
                <>
                    <Header />
                    <ModuleContent toggleModulePractice={toggleStartedModulePractice}/>
                    <div className={styles["divisor-line-container"]}>
                        <div className={styles["divisor-line"]}></div>
                    </div>
                    <Graph />
                </>}
        </div>
    </>
};

export default ModulePractice;