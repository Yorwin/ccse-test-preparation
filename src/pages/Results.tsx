import React from "react";
import { Link } from "react-router-dom";
import styles from '../styles-pages/results.module.css'
import TituloGenerico from "../components/titulo-generico";
import ArrowGoBack from "../components/arrow-go-back";
import GraphicTestsMade from "../components/graphic-tests-made";
import GraphicHoursSimulated from "../components/graphic-hours-simulated";

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

                <GraphicHoursSimulated />
                <GraphicTestsMade />

            </div>
        </div>
    </>
};

export default Results;
