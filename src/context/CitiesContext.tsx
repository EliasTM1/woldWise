import {
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useState,
} from "react";
import { City } from "../types/country";

type CitiesProviderProps = {
	children: ReactNode;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CitiesContext = createContext<null | { cities: any, isLoading: boolean, currentCity: any, getCity: any }>(
	null
);
const BASE_URL = "http://localhost:4444";

function CitiesProvider({ children }: CitiesProviderProps) {
	const [cities, setCities] = useState<[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [currentCity, setCurrentCity] = useState<City | null>(null);

	useEffect(function () {
		async function fetchCities() {
			try {
				setIsLoading(true);
				const response = await fetch(`${BASE_URL}/cities`);
				const data = await response.json();
				setCities(data);
			} catch {
				console.log("There was an error loading your data");
			} finally {
				setIsLoading(false);
			}
		}
		fetchCities();
	}, []);

	async function getCity(id: number| string) {
		try {
			setIsLoading(true);
			const response = await fetch(`${BASE_URL}/cities/${id}`);
			const data = await response.json();
			console.log(data, "data")
			setCurrentCity(data);
		} catch {
			console.log("There was an error loading your data");
		} finally {
			setIsLoading(false);
		}
	}
	return (
		<CitiesContext.Provider value={{ cities, isLoading, currentCity, getCity }}>
			{children}
		</CitiesContext.Provider>
	);
}

function useCities() {
	const context = useContext(CitiesContext);
	if (!context) throw new Error("Cities was used outside the cities provider");
	return context;
}

export { CitiesProvider, useCities };
