// src/js/pages/Private.js
import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Private = () => {
    const { store } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        if (!store.token) {
            navigate("/login");  // Redirige al login si el usuario no está autenticado
        }
    }, [store.token]);

    return (
        <div>
            <h1>Private Page</h1>
            <p>Solo puedes ver esto si estás autenticado.</p>
        </div>
    );
};
