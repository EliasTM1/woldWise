import { Link } from "react-router-dom";
import { City } from "../types/country";
import style from "./CityItem.module.css";

type CityItemProps = {
	currentCity: City;
};

const formatDate = (date: string) => {
	return new Intl.DateTimeFormat("en", {
		day: "numeric",
		month: "long",
		year: "numeric",
	}).format(new Date(date));
};

export function CityItem({ currentCity }: CityItemProps) {
	const { cityName, emoji, date, id, position } = currentCity;
	return (
		<Link className={style.cityItem} to={`${id}?lat=${position.lat}&lng=${position.lng}`}>
			<span className={style.emoji}>{emoji}</span>
			<h3 className={style.name}>{cityName}</h3>
			<time className={style.date}>{formatDate(date)}</time>
			<button className={style.deleteBtn}>&times;</button>
		</Link>
	);
}
