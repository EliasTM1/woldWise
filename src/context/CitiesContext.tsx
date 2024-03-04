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

type CityContext = {
	cities: City[];
	currentCity: City
	getCity: (id: string | number) => Promise<void>;
	isLoading: boolean;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CitiesContext = createContext<CityContext>({} as CityContext);
const BASE_URL = "http://localhost:4444";

export function CitiesProvider({ children }: CitiesProviderProps) {
	const [cities, setCities] = useState<[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [currentCity, setCurrentCity] = useState<City>({} as City);

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

	async function getCity(id: number | string) {
		setIsLoading(true);
		try {
			const response = await fetch(`${BASE_URL}/cities/${id}`);
			const data = await response.json();
			setCurrentCity(data);
		} catch {
			console.log("There was an error loading your data");
		} finally {
			// setTimeout(() => setIsLoading(false),1000)
			setIsLoading(false)
		}
	}
	return (
		<CitiesContext.Provider
			value={{ cities, isLoading, currentCity: currentCity, getCity: getCity }}
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
