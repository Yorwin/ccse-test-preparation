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
        {startedModulePractice || sessionStorage["module"] ?
            <div className={styles["main-container-module-practice"]}>
                <TestPage toggleModulePractice={toggleStartedModulePractice} moduleNumber={moduleNumber} />
            </div>
            :
            <>
                <div className={styles["main-container-module-practice-home"]}>
                    <Header />
                    <ModuleContent toggleModulePractice={toggleStartedModulePractice} setModuleToBePracticed={setModuleToBePracticed} />
                    <div className={styles["divisor-line-container"]}>
                        <div className={styles["divisor-line"]}></div>
                    </div>
                    <Graph />
                </div>
            </>}
    </>
};

export default ModulePractice;