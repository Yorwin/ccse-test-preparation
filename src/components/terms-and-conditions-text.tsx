import React from "react";
import styles from "./terms-and-conditions.module.css"

const TermsAndConditions = () => {
    return <>
        <div className={styles["terms-and-conditions-container"]}>
            <a href="#" className={styles["terms-and-conditions"]}>
                <small>Terminos y Condiciones legales</small>
            </a>
        </div>
    </>
}

export default TermsAndConditions;