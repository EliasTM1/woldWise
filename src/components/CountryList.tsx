import { City } from "../types/country";
import CountryItem from "./CountryItem";
import styles from "./CountryList.module.css";
import Message from "./Message";
import Spinner from "./Spinner";

type CountryListProps = {
	countries: City[];
	isLoading: boolean;
};

export default function CountryList({
	countries,
	isLoading,
}: CountryListProps) {
  const countriesNonDuplicate = countries.reduce((arr, city) => {
    if (!arr.map((el: City) => el.country).includes(city.country)) {
        return [...arr, { country: city.country, emoji: city.emoji }];
    } else {
        return arr;
    }
}, []);

	if (!countries.length)
		return <Message message='Add a city by clicking on a city on the map :)' />;
	if (isLoading) return <Spinner />;
	return (
		<ul className={styles.CountryList}>
			{countriesNonDuplicate.map((country: City, index: number) => {
				return <CountryItem key={index} country={country} />;
			})}
		</ul>
	);
}
