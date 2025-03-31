import React, { useState, useEffect } from "react";
import { useCounter } from "../context/SimulationCounterContext";
import styles from "./counter-test-simulation.module.css"

const Counter = () => {

    const { getFormatedTime } = useCounter();

    return <>
        <div className={styles["counter-main-container"]}>
            <h2>{getFormatedTime()}</h2>
        </div>
    </>
};

export default Counter;