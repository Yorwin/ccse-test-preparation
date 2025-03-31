import React from "react";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./auth-image.module.css"

type Enlaces = {
    enlace_login: React.ReactElement,
    enlace_register: React.ReactElement,
}

const TypeOfButton = () => {

    const enlaces : Enlaces = {
        enlace_login: <Link to="/auth/login" className={styles["link-image"]}>Iniciar sesión</Link>,
        enlace_register: <Link to="/auth/register" className={styles["link-image"]}>Registrarse</Link>
    }

    const location = useLocation();
    const [buttonJSX, setButtonJSX] = useState<React.ReactNode>(null);

    useEffect(() => {
        if(location.pathname.includes("login")) {
            setButtonJSX(enlaces.enlace_register);
        } else if(location.pathname.includes("register")) {
            setButtonJSX(enlaces.enlace_login);
        }
    }, [location.pathname]);

    return <>
        {buttonJSX}
    </>
};

export default TypeOfButton;