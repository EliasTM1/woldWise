import { ReactNode } from "react";
import { City } from "../types/country";

export type ActionType =
	| "loading"
	| "rejected"
	| "city/loaded"
	| "cities/loaded"
	| "city/created"
	| "city/deleted";

export type CitiesProviderProps = {
	children: ReactNode;
};
 
export type ActionObjT = {
    type: ActionType;
    payload?: any;
  }

export type CityContextType = {
	cities: City[];
	currentCity: City;
	isLoading: boolean;
	getCity: (id: string | number) => Promise<void>;
	createCity: (newCity: City) => void;
	deleteCity: (cityId: number) => void;
};
