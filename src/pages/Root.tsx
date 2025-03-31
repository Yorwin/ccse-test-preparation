import React from "react";
import { Outlet } from 'react-router-dom'
import ProtectedRoute from "../components/ProtectedRoute";

const Root = () => {
    return <>
        <ProtectedRoute>
            <Outlet />
        </ProtectedRoute>
    </>
};

export default Root;