import React, { useState } from "react";
import ArrowGoBack from "../../components/arrow-go-back";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase";
import styles from "./styles/settings.module.css"
import RecoverPasswordEmailSent from "./components/recover-password-email-sent";
import { sendPasswordResetEmail } from "firebase/auth";

const Settings = () => {

    const navigate = useNavigate();

    const goHome = () => {
        navigate("/");
    };

    /* Password Recovery Logic */

    const [passwordChangeMessage, setPasswordChangeMessage] = useState(false);

    const toggleConfirmationPasswordMesage = () => {
        if (!passwordChangeMessage) {
            handleResetPassword();
        }

        setPasswordChangeMessage(e => !e);
    }

    const [submit, setSubmit] = useState(false);

    const handleResetPassword = async () => {
        setSubmit(true);

        const user = auth.currentUser;
        const emailRecover = user?.email;

        if (!emailRecover) {
            setSubmit(false);
            return;
        }

        try {
            await sendPasswordResetEmail(auth, emailRecover);
            setSubmit(false);
            setPasswordChangeMessage(true); // Mostrar el mensaje de confirmación
        } catch (error) {
            setSubmit(false);
            console.error("Se ha producido un error" + error)
        }
    };

    /* Email Recovery Logic */



    return <>
        <div className={styles["main-container-settings"]}>
            {passwordChangeMessage ? <RecoverPasswordEmailSent toggleConfirmationPasswordMesage={toggleConfirmationPasswordMesage} loadingState={submit} /> : null}
            <div className={styles["header-container"]}>
                <button onClick={goHome}>
                    <ArrowGoBack />
                </button>
                <h2 className={styles["title"]}>Configuración</h2>
            </div>
            <div className={styles["content-container"]}>

                {/* Account */}
                <div className={styles["block"]}>
                    <h3>CUENTA</h3>
                    <div className={styles["buttons-container"]}>
                        <button onClick={toggleConfirmationPasswordMesage}>Cambiar contraseña</button>
                        <button>Cambiar correo</button>
                    </div>
                </div>

                {/* Visualization Options */}
                <div className={styles["block"]}>
                    <h3>OPCIONES DE VISUALIZACIÓN</h3>
                    <div className={styles["buttons-container"]}>
                        <div className={styles["key-value-container"]}>
                            <button className={styles["button-key-container"]}>
                                <small className={styles["key"]}>Tema</small>
                            </button>
                            <small className={styles["value"]}>Modo Claro</small>
                        </div>
                        <div className={styles["key-value-container"]}>
                            <button className={styles["button-key-container"]}>
                                <small className={styles["key"]}>Tamaño de la fuente</small>
                            </button>
                            <small className={styles["value"]}>Mediano</small>
                        </div>
                    </div>
                </div>

                {/* About the App */}
                <div className={styles["block"]}>
                    <h3>ACERCA DE</h3>
                    <div className={styles["buttons-container"]}>
                        <button className={styles["button-key-container"]}>Terminos y condiciones</button>
                        <div className={styles["key-value-container"]}>
                            <small className={styles["key"]}>Versión de la App</small>
                            <small className={styles["value"]}>1.0.0</small>
                        </div>
                    </div>
                </div>

            </div>

            <div className={styles["footer"]}>
                <div className={styles["terms-and-conditions-container"]}>
                    <a href="#" className={styles["terms-and-conditions"]}>
                        <small>Terminos y Condiciones legales</small>
                    </a>
                </div>
            </div>
        </div>
    </>
};

export default Settings;