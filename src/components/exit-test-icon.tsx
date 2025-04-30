import React, { useEffect, useState } from "react";
import styles from "./exit-test-icon.module.css"

const ExitTestIcon = ({ showConfirmMessage }: { showConfirmMessage: () => void }) => {
    return <>
        <div className={styles["container-exit-icon"]}>
            <button onClick={showConfirmMessage} className={styles["button-exit-simulation"]}>
                <i className="bi bi-x-circle-fill"></i>
                <h2>Salir Prueba</h2>
            </button>
        </div>
    </>
}

export default ExitTestIcon;