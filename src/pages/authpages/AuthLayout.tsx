import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Logo from "../../components/logo-cervantes";
import AuthImage from "../../components/auth-image"
import TermsAndConditions from "../../components/terms-and-conditions-text";
import styles from "../../styles-pages/authorization-pages.module.css"

const AuthLayout = () => {
    return <>
        <Logo />
        <div className={styles["authorization-pages-container"]}>
            <div className={styles["content-container"]}>
                <Outlet />
                <TermsAndConditions />
            </div>
            <AuthImage />
        </div>
    </>
}

export default AuthLayout;