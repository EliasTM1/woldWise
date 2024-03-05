import { createContext, useContext, useEffect, useReducer } from "react";
import { City } from "../types/country";
import {
	ActionObjT,
	ProviderProps,
	CityContextType,
	InitialStateT,
} from "./contextTypes";

const CitiesContext = createContext<CityContextType>({} as CityContextType);
const BASE_URL = "http://localhost:4444";


const initialState: InitialStateT = {
	cities: [],
	isLoading: false,
	currentCity: {} as City,
};

// function reducer(state: InitialState, action: Action) {
function reducer(state: InitialStateT, action: ActionObjT) {
	switch (action.type) {
		case "loading":
			return { ...state, isLoading: true };
		case "rejected":
			return {
				...state,
				isLoading: false,
				error: action.payload,
			};
		case "cities/loaded":
			return {
				...state,
				isLoading: false,
				cities: action.payload,
			};
		case "city/loaded":
			return {
				...state,
				isLoading: false,
				currentCity: action.payload,
			};
		case "city/created":
			return {
				...state,
				isLoading: false,
				cities: [...state.cities, action.payload],
				currentCity: action.payload
			};
		case "city/deleted":
			return {
				...state,
				isLoading: false,
				cities: state.cities.filter(
					(cities: City) => cities.id !== action.payload
				),
				currentCity: {}
			};
		default:
			throw new Error("Unkowon action type");
	}
}

export function CitiesProvider({ children }: ProviderProps) {
	const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
		reducer,
		initialState
	);

	useEffect(function () {
		async function fetchCities() {
			dispatch({ type: "loading" });
			try {
				const response = await fetch(`${BASE_URL}/cities`);
				const data = await response.json();
				dispatch({ type: "cities/loaded", payload: data });
			} catch {
				dispatch({
					type: "rejected",
					payload: "There was an error loading the cities",
				});
			}
		}
		fetchCities();
	}, []);

	async function getCity(id: number | string) {
		if(Number(id) === currentCity.id ) return
		dispatch({ type: "loading" });
		try {
			const response = await fetch(`${BASE_URL}/cities/${id}`);
			const data = await response.json();
			dispatch({ type: "city/loaded", payload: data });
		} catch {
			dispatch({
				type: "rejected",
				payload: "There was an error loading the city",
			});
		}
	}
	async function createCity(newCity: City) {
		try {
			dispatch({ type: "loading" });
			const response = await fetch(`${BASE_URL}/cities`, {
				method: "POST",
				body: JSON.stringify(newCity),
				headers: {
					"Content-Type": "application/json",
				},
			});
			const data = await response.json();
			dispatch({ type: "city/created", payload: data });
		} catch {
			console.log("There was an error creating your data");
		}
	}
	async function deleteCity(id: number) {
		try {
			dispatch({ type: "loading" });
			await fetch(`${BASE_URL}/cities/${id}`, {
				method: "DELETE",
			});

			dispatch({ type: "city/deleted", payload: id });
		} catch {
			console.log("There was an error deleting your coty");
		}
	}
	return (
		<CitiesContext.Provider
			value={{
				cities,
				isLoading,
				currentCity: currentCity,
				getCity,
				createCity,
				deleteCity,
			}}
		>
			{children}
		</CitiesContext.Provider>
	);
}

export function useCities() {
	const context = useContext(CitiesContext);
	if (context === undefined)
		throw new Error("Cities was used outside the cities provider");
	return context;
}

// export { CitiesProvider, useCities };
