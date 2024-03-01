import { City } from "../types/country";
import styles from "./CountryItem.module.css";

type CountryItemProps = {
	country: City;
};

function CountryItem({ country }: CountryItemProps) {
	return (
		<li className={styles.countryItem}>
			<span>{country.emoji}</span>
			<span>{country.country}</span>
		</li>
	);
}

export default CountryItem;
