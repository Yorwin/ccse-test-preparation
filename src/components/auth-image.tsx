import React from "react";
import styles from "./auth-image.module.css"
import Image from "../resources/foto-auth.jpg"
import TypeOfButton from "./typeofbutton";

const AuthImage = () => {
    return <>
        <div className={styles["image-container"]}>
            <img src={Image} alt="Imagen Presentacion" className={styles["presentation-image"]} />
            <div className={styles["image-container-button"]}>
                <TypeOfButton />
                {/* <a href="#" className={styles["link-image"]}>{valorBoton}</a>*/}
            </div>
            <div className={styles["image-band"]}>
                <i className="bi bi-journals"></i>
                <small>Sitio web oficial para la preparación del Examen CCSE</small>
            </div>
        </div>
    </>
};

export default AuthImage;