// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useState } from "react";

import styles from "./Form.module.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

export function convertToEmoji(countryCode) {
	const codePoints = countryCode
		.toUpperCase()
		.split("")
		.map((char: string) => 127397 + char.charCodeAt(0));
	return String.fromCodePoint(...codePoints);
}

function Form() {
	const [cityName, setCityName] = useState("");
	// const [country, setCountry] = useState("");
	const [date, setDate] = useState<string | Date>(new Date());
	const [notes, setNotes] = useState("");
	const navigate = useNavigate();

	const handleBack = (event: MouseEvent) => {
    console.log("first=========")
		event.preventDefault();
		navigate(-1);
	};
	return (
		<form className={styles.form}>
			<div className={styles.row}>
				<label htmlFor='cityName'>City name</label>
				<input
					id='cityName'
					onChange={(e) => setCityName(e.target.value)}
					value={cityName}
				/>
				{/* <span className={styles.flag}>{emoji}</span> */}
			</div>

			<div className={styles.row}>
				<label htmlFor='date'>When did you go to {cityName}?</label>
				<input
					id='date'
					onChange={(e) => setDate(e.target.value)}
					value={date.toLocaleString()}
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
				<Button onClick={() => {}} type='primary'>
					Add
				</Button>
				<Button onClick={(e: MouseEvent) => handleBack(e)} type='back'>
					&larr; Back
				</Button>
			</div>
		</form>
	);
}

export default Form;
