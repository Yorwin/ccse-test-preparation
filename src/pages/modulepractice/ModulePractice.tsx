import React, { useState } from "react";
import Header from "./components/header"
import ModuleContent from "./components/module-content";
import Graph from "./components/Graph";
import TestPage from "./TestPage";
import styles from "../../styles-pages/module-practice.module.css"

const ModulePractice = () => {

    const [startedModulePractice, setStartedModulePractice] = useState(false);
    const [moduleNumber, setModuleNumber] = useState(1);

    const toggleStartedModulePractice = () => {
        setStartedModulePractice(e => !e);
    }

    const setModuleToBePracticed = (moduleNumber: number) => {
        sessionStorage.setItem("module", `${moduleNumber}`);
        setModuleNumber(moduleNumber);
    };

    return <>
        <div className={styles["main-container-module-practice"]}>
            {startedModulePractice || sessionStorage["module"] ? <TestPage toggleModulePractice={toggleStartedModulePractice} moduleNumber={moduleNumber} /> :
                <>
                    <Header />
                    <ModuleContent toggleModulePractice={toggleStartedModulePractice} setModuleToBePracticed={setModuleToBePracticed} />
                    <div className={styles["divisor-line-container"]}>
                        <div className={styles["divisor-line"]}></div>
                    </div>
                    <Graph />
                </>}
        </div>
    </>
};

export default ModulePractice;