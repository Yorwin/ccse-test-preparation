import React from "react";
import styles from "../../../styles-pages/module-practice.module.css"
import { toggleFunctionProp } from "../types";

const ModuleContent = ({toggleModulePractice} : toggleFunctionProp) => {

    const arrayModulePractice = [{
        desc: "Gobierno, legislación y participación ciudadana.",
        icon: "bi bi-1-circle-fill",
    },
    {
        desc: "Derechos y Deberes Fundamentales.",
        icon: "bi bi-2-circle-fill",
    },
    {
        desc: "Organización Territorial de España, Geografía, y política.",
        icon: "bi bi-3-circle-fill",
    },
    {
        desc: "Cultura e historia de España",
        icon: "bi bi-4-circle-fill",
    },
    {
        desc: "Sociedad Española.",
        icon: "bi bi-5-circle-fill",
    }]

    const contentArray = arrayModulePractice.map((e, index) => {
        return (
            <div className={styles["module-clickable-content"]} key={index}>
                <button onClick={toggleModulePractice} className={styles["button-module"]}>
                    <div className={styles["module-practice"]}>
                        <div className={styles["icon-container"]}>
                            <i className={e.icon}></i>
                        </div>
                        <p className={styles["module-desc"]}>{e.desc}</p>
                    </div>
                </button>
            </div>
        )
    })

    return (
        <div className={styles["module-content-container"]}>
            {contentArray}
        </div>
    )
}

export default ModuleContent;