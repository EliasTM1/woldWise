import { Link } from "react-router-dom";
import { City } from "../types/country";
import style from "./CityItem.module.css";
import { useCities } from "../context/CitiesContext";

type CityItemProps = {
	city: City;
};

const formatDate = (date: string) => {
	return new Intl.DateTimeFormat("en", {
		day: "numeric",
		month: "long",
		year: "numeric",
	}).format(new Date(date));
};

export function CityItem({ city }: CityItemProps) {
	const { currentCity } = useCities();
	const { cityName, emoji, date, id, position } = city;
	return (
		<Link
			// className={`${style.cityItem} ${id === currentCity.id ? style['cityItem--active']: ''}`}
			className={`${style.cityItem}`}
			to={`${id}?lat=${position.lat}&lng=${position.lng}`}
		>
			<span className={style.emoji}>{emoji}</span>
			<h3 className={style.name}>{cityName}</h3>
			<time className={style.date}>{formatDate(date)}</time>
			<button className={style.deleteBtn}>&times;</button>
		</Link>
	);
}
