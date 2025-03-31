import React, { ChangeEvent, FormEvent, useState } from "react";
import { auth } from "../config/firebase";
import styles from "../styles-pages/authorization-pages.module.css"
import { sendPasswordResetEmail } from "firebase/auth";

interface ButtonProps {
    show: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const RecoverPassword = ({ show }: ButtonProps) => {

    const [emailRecover, setEmailRecover] = useState("");
    const [message, setMessage] = useState<React.ReactNode>(<></>);
    const [emailSent, setEmailSent] = useState(false);
    const [submit, setSubmit] = useState(false);

    const messageContent = (
        <div className={styles["message-recover-container"]}>
            <h2>✉️ ¡Revisa tu bandeja de entrada!</h2>
            <div className={styles["container-parragraphs-recover-password-message"]}>
                <p>Te hemos enviado un correo con las instrucciones para restablecer tu contraseña.</p>
                <p>Si no lo ves en unos minutos, revisa tu carpeta de spam o correo no deseado.</p>
                <p>Si necesitas más ayuda, no dudes en contactarnos.</p>
            </div>
            <div className={styles["in-case-of-error-message"]}>
                <p>📩 ¿No recibiste el correo?</p>
                <button onClick={() => handleResetPassword({ preventDefault: () => { } } as FormEvent<HTMLFormElement>)}>Reenviar</button>
            </div>
        </div>
    )

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setEmailRecover(value);
    }

    const handleResetPassword = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmit(true);

        try {
            await sendPasswordResetEmail(auth, emailRecover);
            setSubmit(false);
            setMessage(messageContent);
            setEmailSent(true);
        } catch (error) {

            setSubmit(false);
            let errorMessage = "You have experienced an unknowed error"

            if (error instanceof Error) {
                errorMessage = error.message;
            }

            setMessage("❌ Error: " + errorMessage);
        }
    };

    return <>
        <div className={styles["recover-password-container"]}>
            <div className={styles["recover-password-content-container"]}>
                <div className={styles["icon-container"]}>
                    <i onClick={show} className="bi bi-x-square"></i>
                </div>
                <div className={styles["form-container"]}>

                    {emailSent ? <p className={styles["message-recover-password"]}>{message}</p> :
                        (<>
                            <h1>Recuperar Contraseña</h1>
                            <form onSubmit={handleResetPassword}>
                                <input type="email"
                                    name="e-mail-recover-field"
                                    placeholder="Ingresa tu email"
                                    value={emailRecover}
                                    onChange={(e) => handleEmailChange(e)}
                                    required />

                                <button type="submit" className={styles["button"]}>{submit ? (
                                    <div className="d-flex justify-content-center align-items-center">
                                        <div className="spinner-border text-light" role="status">
                                            <span className="visually-hidden">Cargando...</span>
                                        </div>
                                    </div>
                                ) : "Enviar correo"}</button>
                            </form>
                        </>
                        )
                    }
                </div>
            </div>
        </div>
    </>
};

export default RecoverPassword;