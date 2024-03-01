import { City } from "../types/country";
import { CityItem } from "./CityItem";
import styles from "./CountryList.module.css";
import Message from "./Message";
import Spinner from "./Spinner";

type CityListProps = {
	cities: City[];
	isLoading: boolean;
};

export default function CityList({ cities, isLoading }: CityListProps) {
	if (!cities.length)
		return <Message message='Add a city by clicking on a city on the map :)' />;
	if (isLoading) return <Spinner />;
	return (
		<ul className={styles.cityList}>
			{cities.map((city: City) => {
				return <CityItem key={city.id} currentCity={city} />;
			})}
		</ul>
	);
}
