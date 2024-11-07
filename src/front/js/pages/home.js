import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";

export const Home = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    return (
        <div 
            className="d-flex justify-content-center align-items-center"
            style={{
                minHeight: "100vh",
                background: "url('https://images.unsplash.com/photo-1586200390480-c399b7ad4c9a') no-repeat center center fixed",
                backgroundSize: "cover",
                color: "white",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
                fontFamily: "'Star Jedi', sans-serif", // Usamos la fuente de Star Wars
            }}
        >
            <div className="text-center p-5" style={{ backgroundColor: "rgba(0, 0, 0, 0.7)", borderRadius: "15px" }}>
                <h1 className="display-3 mb-4 text-warning font-weight-bold">Bienvenido a la Galaxia</h1>

                {/* Estado de autenticación del usuario */}
                {store.token ? (
                    <div>
                        <p className="alert alert-success">¡Estás autenticado!</p>
                        <button
                            className="btn btn-danger btn-lg mt-3"
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
                        <Link to="/login" className="btn btn-primary btn-lg mx-2">Iniciar sesión</Link>
                        <Link to="/signup" className="btn btn-secondary btn-lg mx-2">Registrarse</Link>
                    </div>
                )}
            </div>
        </div>
    );
};
