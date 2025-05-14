import React from "react";
import styles from "./homepage-option-element.module.css"
import { Link } from "react-router-dom";

type HomePageProps = {
    icono: string;
    titulo: string;
    descripcion: string;
    enlace: string;
};

const HomePageOptionElement = ({ icono, titulo, descripcion, enlace }: HomePageProps) => {
    return <>
        <div className="col-md-6 col-sm-12 my-5">
            <div className={styles["contenedor-opcion"]}>
                <i className={icono}></i>
                <div className={styles["contenedor-texto"]}>
                    <Link to={enlace}>
                        <h3>{titulo}</h3>
                        <p>{descripcion}</p>
                    </Link>
                </div>
            </div>
        </div>
    </>
};

export default HomePageOptionElement;