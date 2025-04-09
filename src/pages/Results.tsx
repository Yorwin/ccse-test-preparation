import React from "react";
import { Link } from "react-router-dom";
import styles from '../styles-pages/results.module.css'
import TituloGenerico from "../components/titulo-generico";
import ArrowGoBack from "../components/arrow-go-back";
import GraphicTestsMade from "../components/graphic-tests-made";
import GraphicHoursSimulated from "../components/graphic-hours-simulated";
import GraphRightTestsPercentage from "../components/graph-percentage-right-answers";
import GraphicWeekSummary from "../components/graphic-week-summary";

const Results = () => {
    return <>
        <div className={styles["main-container-results"]}>
            <div className={styles["content-container"]}>

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
                                    <GraphRightTestsPercentage />
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-6 mb-sm-5 d-flex justify-content-center">
                                <GraphicHoursSimulated />
                            </div>
                            <div className="col-md-3 col-sm-6 mb-sm-5 d-flex justify-content-center">
                                <GraphicTestsMade />
                            </div>
                            <div className="col-md-4 col-sm-12 mb-sm-5 d-flex justify-content-center">
                                <GraphicWeekSummary />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
};

export default Results;
