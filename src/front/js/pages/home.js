import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";

export const Home = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    return (
        <div className="text-center mt-5">
            <h1>Bienvenido</h1>

            {/* Estado de autenticación del usuario */}
            {store.token ? (
                <div>
                    <p className="alert alert-success">¡Estás autenticado!</p>
                    <button 
                        className="btn btn-danger" 
                        onClick={() => {
                            actions.logout();
                            navigate("/login");
                        }}
                    >
                        Cerrar sesión
                    </button>
                </div>
            ) : (
                <div>
                    <p className="alert alert-warning">No estás autenticado.</p>
                    <Link to="/login" className="btn btn-primary mx-2">Iniciar sesión</Link>
                    <Link to="/signup" className="btn btn-secondary mx-2">Registrarse</Link>
                </div>
            )}
        </div>
    );
};
