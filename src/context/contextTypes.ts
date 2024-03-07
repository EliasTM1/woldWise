import { ReactNode } from "react";
import { City } from "../types/country";

export type ActionType =
	| "loading"
	| "rejected"
	| "city/loaded"
	| "cities/loaded"
	| "city/created"
	| "city/deleted";

export type FakeAuthType = "login" | "logout";

export type InitialStateT = {
	cities: City[];
	isLoading: boolean;
	currentCity: City;
};

export type ProviderProps = {
	children: ReactNode;
};

export type ActionObjT = {
	type: ActionType;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	payload?: any;
};
// 
export type AuthObjT = {
	type: FakeAuthType;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	payload?: any;
};

export type CityContextType = {
	cities: City[];
	currentCity: City;
	isLoading: boolean;
	getCity: (id: string | number) => Promise<void>;
	createCity: (newCity: City) => void;
	deleteCity: (cityId: number) => void;
};

export type UserContextType = {
	user: {name: string, password: string};
	isAuthenticated: boolean
	login: (name: string, password: string) => void
	logout: () => void;
};
