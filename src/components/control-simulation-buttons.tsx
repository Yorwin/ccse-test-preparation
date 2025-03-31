import React from "react";
import styles from "./control-simulation-buttons.module.css"

type ControlSimulationProps = {
    nextModule : () => void;
    buttonState : boolean;
}

const ControlSimulationButtons = ({nextModule, buttonState}: ControlSimulationProps) => {
    return <>
        <div className={styles["control-simuation-buttons-main-container"]}>
            <button>Finalizar Prueba</button>
            <button className={styles["button-continue-module"]} onClick={nextModule} disabled={buttonState}>Siguiente</button>
        </div>
    </>
};

export default ControlSimulationButtons;