import React from "react";
import ArrowGoBack from "../../../components/arrow-go-back"
import { useNavigate } from "react-router-dom";
import styles from "../../../styles-pages/module-practice.module.css"

const Header = () => {
    
    const navigate = useNavigate();

    const GoBack = () => {
        navigate(-1);
    };

    return (
        <div className={styles["header-container"]}>
            <div className={styles["module-practice-title"]}>
                <h2>ESCOGE EL MODULO A PRACTICAR</h2>
            </div>
            <button onClick={GoBack} className={styles["arrow-container"]}>
                <ArrowGoBack />
            </button>
        </div>
    )
}

export default Header;