import React from "react";
import LogoImg from "../resources/logo-instituto-cervantes.png"
import styles from "./logo-instituto-cervantes.module.css"

const Logo = () => {
    return <>
        <a href="https://cervantes.org" target="_blank">
            <img src={LogoImg} className={styles["logo"]} alt="Logo Instituto Cervantes" />
        </a>
    </>
};

export default Logo;