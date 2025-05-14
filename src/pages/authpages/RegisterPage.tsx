import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles-pages/authorization-pages.module.css"
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../../config/firebase'
import { useNavigate } from "react-router-dom";
import useForm from "../../hooks/useForm";

type RegisterType = (auth: any, email: string, password: string, name: string) => void;

const RegisterPage = () => {

    const { values, errors, handleChange, handleSubmit, setErrors, handleBlur } = useForm({
        name_register: '',
        email_register: '',
        password_register: '',
    })

    const [submit, setSubmit] = useState(false);

    const navigate = useNavigate();

    const handleRegister: RegisterType = async (auth, email, password, name) => {
        setSubmit(true);

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            //Guardar en Firestore
            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                email: user.email,
                username: name,
                createdAt: new Date(),
            });

            //Redireccionar a menu principal
            navigate("/");
            setSubmit(false);
        } catch (error) {
            setErrors(prev => ({
                ...prev,
                submit: "El correo que estas intentando usar ya tiene una cuenta registrada. Te recomendamos iniciar sesión o recuperar tu contraseña para acceder."
            }))
            setSubmit(false);
        }
    };

    const [showPassword, setShowPassword] = useState("password");

    const togglePassword = () => {
        if (showPassword === "password") {
            setShowPassword("text");
        } else {
            setShowPassword("password")
        }
    }

    return <>
        <div className={styles["register-page-container"]}>
            <div className={styles["register-header"]}>
                <h2>Unete!</h2>
                <p>Crea una cuenta</p>
            </div>
            <form className={styles["formulario-register"]} onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(handleRegister);
            }}>
                <div className={styles["inputs"]}>

                    <div className={styles["container-input-login-register"]}>

                        <div className={styles["container-input"]}>
                            <label htmlFor="name-register" className={styles["label-register"]}>Nombre</label>
                            <input id="name-register"
                                type="text"
                                value={values.name_register}
                                placeholder="Nombre"
                                name="name_register"
                                className={styles["input-register"]}
                                onChange={(e) => handleChange(e)}
                                onBlur={handleBlur}
                                required />

                            {errors.name_register && errors.name_register !== "Campo obligatorio" && (
                                <p className={styles["error-message-register-input"]}>{errors.name_register}</p>
                            )}

                        </div>

                        {/* E-mail */}

                        <div className={styles["container-input"]}>

                            <label htmlFor="e-mail-register" className={styles["label-register"]}>E-mail</label>
                            <input id="e-mail-register"
                                type="e-mail"
                                placeholder="E-mail"
                                className={styles["input-register"]}
                                name="email_register"
                                value={values.email_register}
                                onChange={(e) => handleChange(e)}
                                onBlur={handleBlur}
                                required />

                            {errors.email_register && errors.email_register !== "Campo obligatorio" && (
                                <p className={styles["error-message-register-input"]}>{errors.email_register}</p>
                            )}

                        </div>

                        {/* Contraseña */}

                        <div className={styles["password-container"]}>

                            <label htmlFor="password-register" className={styles["label-register"]}>Contraseña</label>
                            <input id="password-register"
                                type={showPassword}
                                placeholder="Contraseña"
                                className={styles["input-register"]}
                                name="password_register"
                                value={values.password_register}
                                onChange={(e) => handleChange(e)}
                                onBlur={handleBlur}
                                required />

                            <button type="button" onClick={togglePassword} className={styles["show-password"]}>{showPassword === "password" ? <i className="bi bi-eye"></i> : <i className="bi bi-eye-slash"></i>}</button>

                            {errors.password_register && errors.password_register !== "Campo obligatorio" && (
                                <p className={styles["error-message-register-input"]}>{errors.password_register}</p>
                            )}

                        </div>

                        {errors.submit && <p className={styles["errors"]}>{errors.submit}</p>}

                        <button className={styles["button"]} type="submit" disabled={!(Object.keys(errors).length === 0 && values.email_register.trim() !== "" && values.password_register.trim() !== "" && values.name_register.trim() !== "")}> {submit ? (
                            <div className="d-flex justify-content-center align-items-center">
                                <div className="spinner-border text-light" role="status">
                                    <span className="visually-hidden">Cargando...</span>
                                </div>
                            </div>) : "Crear una cuenta"}
                        </button>

                    </div>
                </div>

                <p>Has estado aquí antes? <Link to="/auth/login">Inicia sesión</Link></p>
            </form>
        </div>
    </>
};

export default RegisterPage;