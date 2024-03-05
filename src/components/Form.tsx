// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import styles from "./Form.module.css";
import Button from "./Button";
import { BackButton } from "./BackButton";
import { useUrlLocation } from "../hooks/useUrlLocation";
import Message from "./Message";
import Spinner from "./Spinner";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCities } from "../context/CitiesContext";
import { useNavigate } from "react-router-dom";

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

export function convertToEmoji(countryCode: string) {
	const codePoints = countryCode
		.toUpperCase()
		.split("")
		.map((char: string) => 127397 + char.charCodeAt(0));
	return String.fromCodePoint(...codePoints);
}

function Form() {
	const [cityName, setCityName] = useState("");
	const [country, setCountry] = useState("");
	const [date, setDate] = useState<Date>(new Date());
	const [notes, setNotes] = useState("");
	const [isLoadingGeo, setIsLoadingGeo] = useState<boolean>(false);
	const [emoji, setEmoji] = useState<string>("");
	const [geoCodeError, setGeoCodeError] = useState<string>("");
	const [startDate, setStartDate] = useState(new Date());

	const { lat, lng } = useUrlLocation();
	const { createCity, isLoading } = useCities();

	const navigate  = useNavigate();

	useEffect(() => {
		async function getCityData() {
			try {
				setIsLoadingGeo(true);
				setGeoCodeError("");
				const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
				const data = await res.json();
				if (!data.countryCode) {
					throw new Error(
						"That doesn't seem to be a city, click somewhere else 😅"
					);
				}
				setCityName(data.city || data.locality || "");
				setCountry(data.countryName);
				setEmoji(convertToEmoji(data.countryCode));
			} catch (error) {
				setGeoCodeError(error.message);
			} finally {
				setIsLoadingGeo(false);
			}
		}
		getCityData();
	}, [lat, lng]);

	async function handleSubmit(e: MouseEvent) {
		e.preventDefault();
		if (!cityName || !date) return;

		const newCity = {
			cityName,
			country,
			emoji,
			date,
			notes,
			position: {
				lat,
				lng,
			},
		};
		await createCity(newCity);
		navigate('/app/cities')
	}

	if (isLoadingGeo) return <Spinner />;

	if (!lat && !lng)
		return <Message message='Start by clicking somewhere on the map' />;

	if (geoCodeError) return <Message message={geoCodeError} />;

	return (
		<form
			className={`${styles.form} ${isLoading ? styles.loading : ""}`}
			onSubmit={() => handleSubmit}
		>
			<div className={styles.row}>
				<label htmlFor='cityName'>City name</label>
				<input
					id='cityName'
					onChange={(e) => setCityName(e.target.value)}
					value={cityName}
				/>
				<span className={styles.flag}>{emoji}</span>
			</div>

			<div className={styles.row}>
				<label htmlFor='date'>When did you go to {cityName}?</label>
				{/* <DatePicker /> */}

				<DatePicker
					onChange={(date) => {
						if (date) {
							setDate(date);
						}
					}}
					selected={date}
					dateFormat='dd/MM/yyyy'
					id='date'
				/>
			</div>

			<div className={styles.row}>
				<label htmlFor='notes'>Notes about your trip to {cityName}</label>
				<textarea
					id='notes'
					onChange={(e) => setNotes(e.target.value)}
					value={notes}
				/>
			</div>

			<div className={styles.buttons}>
				<Button onClick={handleSubmit} type='primary'>
					Add
				</Button>
				<BackButton />
				{/* <Button onClick={handleBack} type='back'>
					&larr; Back
				</Button> */}
			</div>
		</form>
	);
}

export default Form;
