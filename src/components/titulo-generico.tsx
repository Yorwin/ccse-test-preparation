import React from "react";
import styles from './titulo-generico.module.css'

interface Props {
    titulo: string;
};

const TituloGenerico = ({ titulo } : Props) => {
    return <h1 className={styles["titulo"]}>{titulo}</h1>
};

export default TituloGenerico;