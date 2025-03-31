import React from "react";
import styles from "./container-model.module.css"

const ContainerModel = ({children}: any) => {
    return <>
        <div className={styles["container"]}>
            {children}
        </div>
    </>
};

export default ContainerModel;