import React, { useState, useEffect } from "react";
import getState from "./flux.js";

// Inicializa el contexto con null por defecto.
export const Context = React.createContext(null);

// Inyecta el contexto global en cualquier componente donde se necesite usar, se inyecta en layout.js.
const injectContext = PassedComponent => {
	const StoreWrapper = props => {
		// Estado inicial que se pasará como valor del contexto
		const [state, setState] = useState(
			getState({
				getStore: () => state.store,
				getActions: () => state.actions,
				setStore: updatedStore =>
					setState({
						store: Object.assign(state.store, updatedStore),
						actions: { ...state.actions }
					})
			})
		);

		useEffect(() => {
			// Llamadas iniciales al cargar la aplicación
			state.actions.checkAuthentication(); // Verifica si el usuario tiene un token almacenado
			state.actions.getMessage(); // Obtiene un mensaje desde el backend
		}, []);

		// Proporciona el estado inicial al contexto, que ahora tiene getStore, getActions y setStore
		return (
			<Context.Provider value={state}>
				<PassedComponent {...props} />
			</Context.Provider>
		);
	};
	return StoreWrapper;
};

export default injectContext;
