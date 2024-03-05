import { useParams } from "react-router-dom";
import styles from "./City.module.css";
import { useCities } from "../context/CitiesContext";
import { useEffect } from "react";
import Spinner from "./Spinner";
import { BackButton } from "./BackButton";

const formatDate = (date: string) => {
	const parsedDate = new Date(date); // Try parsing the input string as a Date object

	if (isNaN(parsedDate.getTime())) {
		return "";
	}

	return new Intl.DateTimeFormat("en", {
		day: "numeric",
		month: "long",
		year: "numeric",
		weekday: "long",
	}).format(parsedDate);
};

function City() {
	const { id } = useParams();
	const { getCity, currentCity, isLoading } = useCities();
	const { cityName, emoji, date, notes } = currentCity;

	useEffect(() => {
		if (id) getCity(id);
	}, [id]);

	if(isLoading) {
		return <Spinner />
	}

	return (
		<div className={styles.city}>
			<div className={styles.row}>
				<h6>City name</h6>
				<h6>{id}</h6>
				<h3>
					<span>{emoji}</span> {cityName}
				</h3>
			</div>

			<div className={styles.row}>
				<h6>{/* You went to {cityName} on {lat} {lng} */}</h6>
				<p>{formatDate(date)}</p>
			</div>

			{notes && (
				<div className={styles.row}>
					<h6>Your notes</h6>
					<p>{notes}</p>
				</div>
			)}

			<div className={styles.row}>
				<h6>Learn more</h6>
				<a
					href={`https://en.wikipedia.org/wiki/${cityName}`}
					target='_blank'
					rel='noreferrer'
				>
					Check out {cityName} on Wikipedia &rarr;
				</a>
			</div>

			<div><BackButton /></div>
		</div>
	);
}

export default City;
