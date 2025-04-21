import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from '../styles-pages/results.module.css'
import TituloGenerico from "../components/titulo-generico";
import ArrowGoBack from "../components/arrow-go-back";
import GraphicTestsMade from "../components/graphic-tests-made";
import GraphicHoursSimulated from "../components/graphic-hours-simulated";
import GraphRightTestsPercentage from "../components/graph-percentage-right-answers";
import GraphicWeekSummary from "../components/graphic-week-summary";
import HistoryOfSimulations from "../components/history-of-simulations";
import SimulationResults from "../components/simulation-results";
import { db } from "../config/firebase";
import { auth } from "../config/firebase";
import { getDocs, collection } from "firebase/firestore";

const Results = () => {

    const [totalTests, setTestsTotal] = useState(0);
    const [correctTests, setCorrectTests] = useState(0);
    const [incorrectTests, setIncorrectTests] = useState(0);

    const [simulationResult, setSimulationResult] = useState(false);

    const user = auth.currentUser;

    if (!user) {
        throw new Error("Usuario no autenticado");
    }

    const getTestsResults = async () => {
        const totalTestsResults: number[] = [];
        const resultsRef = collection(db, "users", user.uid, "resultados");
        const querySnapshot = await getDocs(resultsRef);

        querySnapshot.forEach(doc => {
            const data = doc.data();
            const score = data.score;

            totalTestsResults.push(score);
        })

        return totalTestsResults;
    };

    const isTestValid = (results: number[]) => {
        let correctAnswers = 0;

        results.forEach((e: number) => {
            if (e >= 20) {
                correctAnswers = + 1;
            }
        })

        return correctAnswers;
    };

    const getTestsInfo = () => {
        getTestsResults()
            .then((e) => {
                setTestsTotal(e.length);
                return e;
            }).then((e) => {
                const approvedTests = isTestValid(e);
                setCorrectTests(approvedTests);
                return { e, approvedTests };
            }).then((e) => {
                const incorrectTests = e.e.length - e.approvedTests;
                setIncorrectTests(incorrectTests);
            });
    };

    const toggleShowSimulationResult = () => {
        setSimulationResult(e => !e);
    }

    useEffect(() => {
        getTestsInfo()
    })

    return <>
        <div className={styles["main-container-results"]}>
            <div className={styles["content-container"]}>
                {simulationResult ? <SimulationResults showSimulationResult={toggleShowSimulationResult} /> : (
                    <>
                        {/* Header */}
                        <div className={styles["title-container"]}>
                            <TituloGenerico titulo="Resultados exámenes" />
                        </div>

                        <div className={styles["container-arrow-go-back"]}>
                            <Link to={"/"}>
                                <ArrowGoBack />
                            </Link>
                        </div>

                        {/* Graphs */}
                        <div className={styles["graphics-main-container"]}>
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-md-2 col-sm-12 d-flex justify-content-center mb-sm-3">
                                        <div>
                                            <GraphRightTestsPercentage totalTests={totalTests} correctTests={correctTests} />
                                        </div>
                                    </div>
                                    <div className="col-md-3 col-sm-6 mb-sm-5 d-flex justify-content-center">
                                        <GraphicHoursSimulated />
                                    </div>
                                    <div className="col-md-3 col-sm-6 mb-sm-5 d-flex justify-content-center">
                                        <GraphicTestsMade correctTests={correctTests} incorrectTests={incorrectTests} totalTests={totalTests} />
                                    </div>
                                    <div className="col-md-4 col-sm-12 mb-sm-5 d-flex justify-content-center">
                                        <GraphicWeekSummary />
                                    </div>
                                </div>

                                {/* History of Simulations*/}

                                <div className="row">
                                    <div className={styles["container-history-simulations"]}>
                                        <HistoryOfSimulations showSimulationResult={toggleShowSimulationResult} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    </>
};

export default Results;
