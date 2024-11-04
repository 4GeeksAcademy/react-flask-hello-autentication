// src/js/store/flux.js
const BACKEND_URL = process.env.BACKEND_URL || "https://horrible-wraith-xqxq4gj7vp6h6w6v-3001.app.github.dev/";

const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            message: null,
            token: sessionStorage.getItem("token") || null,  // Mantener el token en sessionStorage
        },
        actions: {
            // Obtener mensaje del backend
            getMessage: async () => {
                try {
                    const response = await fetch(`${BACKEND_URL}/message`);
                    const data = await response.json();
                    setStore({ message: data.message });
                } catch (error) {
                    console.error("Error fetching message from backend:", error);
                }
            },
            
            // Iniciar sesión y almacenar el token
            login: async (email, password) => {
                try {
                    const response = await fetch(`${BACKEND_URL}/login`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ email, password })
                    });
                    if (response.ok) {
                        const data = await response.json();
                        sessionStorage.setItem("token", data.token);
                        setStore({ token: data.token });
                        return true;
                    } else {
                        console.error("Failed to log in");
                        return false;
                    }
                } catch (error) {
                    console.error("Error during login:", error);
                    return false;
                }
            },

            // Función de registro
            signup: async (email, password) => {
                try {
                    const response = await fetch(`${BACKEND_URL}/signup`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ email, password })
                    });
                    if (response.ok) {
                        return true; // El registro fue exitoso
                    } else {
                        console.error("Error al registrar el usuario");
                        return false; // Falló el registro
                    }
                } catch (error) {
                    console.error("Error en la conexión:", error);
                    return false;
                }
            },

            // Cerrar sesión y eliminar el token
            logout: () => {
                sessionStorage.removeItem("token");
                setStore({ token: null });
            },

            // Verificar si el usuario está autenticado
            checkAuthentication: () => {
                const token = sessionStorage.getItem("token");
                if (token) setStore({ token });
            }
        }
    };
};

export default getState;
