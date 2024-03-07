import { createContext, useContext, useReducer } from "react";
import { AuthObjT, ProviderProps, UserContextType } from "./contextTypes";
import { FAuthInitialStateT } from "./FakeAuthTypes";

const FAKE_USER = {
	name: "Elias",
	email: "etoscanoprime@gmail.com",
	password: "qwerty",
	avatar: "https://i.pravatar.cc/100?u=zz",
};

const AuthContext = createContext<UserContextType>({} as UserContextType);

const FAuthInitialState: FAuthInitialStateT = {
	email: null,
	isAuthenticated: false,
};

function reducer(
	state: FAuthInitialStateT,
	action: AuthObjT
) {
	switch (action.type) {
		case "login":
			return {
				...state,
				user: action.payload,
				isAuthenticated: true,
			};
		case "logout":
			break;

		default:
			break;
	}
}

function AuthProvider({ children }: ProviderProps) {
	const [{ user, isAuthenticated }, dispatch] = useReducer(reducer, FAuthInitialState);

	function login(email: string, password: string) {
		if (email === FAKE_USER.email && password === FAKE_USER.password) {
			console.log("MONOS")
			// dispatch({ type: "login", payload: FAKE_USER });
		}
	}

	function logout() {
		// dispatch({ type: "logout" });
	}
	return (
		<AuthContext.Provider
			value={{
				user,
				isAuthenticated,
				login,
				logout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

function useFakeAuth() {
	const context = useContext(AuthContext);
	if (context === undefined)
		throw new Error("Fake auth was used outside the cities provider");
	return context;
}

export {AuthProvider, useFakeAuth}
