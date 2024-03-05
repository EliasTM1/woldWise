import { ReactElement } from "react";
import styles from "./Button.module.css";

type ButtonProps = { 
	onClick: (event: MouseEvent) => void;
	type: "primary" | "back" | "position";
	children: ReactElement | string;
};
export default function Button({ onClick, type, children }: ButtonProps) {
	function handleClick(evento: MouseEvent) {
		evento.preventDefault();
		onClick(evento);
	}
	return (
		<button
			className={`${styles.btn} ${styles[type]}`}
			onClick={(event : MouseEvent) => handleClick(event)}
		>
			{children}
		</button>
	);
}
