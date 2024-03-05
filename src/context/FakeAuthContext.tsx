import { createContext, useContext, useReducer } from "react";
import { AuthObjT, FakeAuthType, ProviderProps } from "./contextTypes";
import { FAuthInitialStateT } from "./FakeAuthTypes";

const FAKE_USER = {
	name: "Elias",
	email: "etoscanoprime@gmail.com",
	password: "qwerty",
	avatar: "https://i.pravatar.cc/100?u=zz",

}

// eslint-disable-next-line react-refresh/only-export-components
const AuthContext = createContext({});

// eslint-disable-next-line react-refresh/only-export-components
const FAuthInitialState: FAuthInitialStateT = {
	email: null,
	isAuthenticated: false,
};

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
function reducer(state: FAuthInitialStateT, action: {type: FakeAuthType, payload?: any}) {
	switch (action.type) {
		case "login":
			return {
				...state,
				user: action.payload,
				isAuthenticated: true
			}
		case "logout":
			break;

		default:
			break;
	}
}

export function AuthProvider({ children }: ProviderProps) {
	const [{user, isAuthenticated}, dispatch] = useReducer(reducer, FAuthInitialState)

	function login(email: string , password: string) {
		if(email === FAKE_USER.email && password === FAKE_USER.password) {
			dispatch({type: "login", payload: FAKE_USER})
		}
	}

	function logout() {
		dispatch({type: "logout"})
	}
	return <AuthContext.Provider value={{
		user, isAuthenticated, login, logout
	}}>{children}</AuthContext.Provider>;
}

export function useFakeAuth() {
	const context = useContext(AuthContext);
	if (context === undefined)
		throw new Error("Fake auth was used outside the cities provider");
	return context;
}
