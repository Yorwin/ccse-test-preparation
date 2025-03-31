import React, { useState, useEffect } from "react";
import ProfileDefaultImg from "../resources/profile-default.jpg"
import { signOut } from 'firebase/auth'
import { auth } from '../config/firebase'
import { doc, DocumentData, getDoc } from 'firebase/firestore'
import { db } from "../config/firebase";
import { useAuth } from "../context/AuthContext";
import styles from "./profile-section.module.css"

const ProfileSection = () => {
    const [botonPulsado, setBotonPulsado] = useState(false);
    const [userInfo, setUserInfo] = useState<DocumentData | null>(null);

    const { user } = useAuth();

    const getUserById = async (userId: any) => {
        try {
            const userRef = doc(db, "users", userId);
            const docSnap = await getDoc(userRef);

            if (docSnap.exists()) {
                return docSnap.data() // Datos del usuario
            } else {
                console.log("No se encontró el usuario");
                return null;
            }
        } catch (error) {
            console.error("Error obteniendo usuario:", error);
            return null;
        }
    }

    useEffect(() => {
        if (user) {
            getUserById(user.uid)
                .then((data) => {
                    setUserInfo(data)
                })
                .catch(error => console.log("Error obteniendo datos", error));
        }
    }, [user]);

    const logoutUser = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.log("Error al cerrar sesión", error);
        }
    }

    const menuBar = (
        <div className={`${styles["menu-bar"]} ${styles["menu-bar-absolute"]}`}>
            <ul>
                <li>
                    <i className="bi bi-person"></i>
                    <a href="#"><small>Perfil</small></a>
                </li>
                <li>
                    <i className="bi bi-gear"></i>
                    <a href="#"><small>Configuraciones</small></a>
                </li>
                <li onClick={logoutUser}>
                    <i className="bi bi-box-arrow-right"></i>
                    <a href="#"><small>Cerrar sesión</small></a>
                </li>
            </ul>
        </div>
    );

    const toggleMenu = () => {
        setBotonPulsado(!botonPulsado);
    };

    return (
        <div className={styles["main-container"]}>
            <div className={styles["profile"]}>
                <div className={styles["profile-info-container"]}>
                    <img src={ProfileDefaultImg} alt="Imagen por defecto perfil" />
                    <div className={styles["profile-info-section"]}>
                        <ul>
                            <li className={styles["username"]}>{userInfo?.username}</li>
                            <li className={styles["e-mail"]}>{userInfo?.email}</li>
                        </ul>
                    </div>
                    <button
                        onClick={toggleMenu}
                        className={`${styles["menu-button"]} ${botonPulsado ? styles["rotated"] : ''}`}
                    >
                        <i className="bi bi-chevron-down"></i>
                    </button>
                </div>
                {botonPulsado && menuBar}
            </div>
        </div>
    );
};

export default ProfileSection;