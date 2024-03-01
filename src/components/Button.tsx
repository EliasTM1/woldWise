import { ReactElement } from "react";
import styles from "./Button.module.css";

type ButtonProps = {
	onClick: (event:MouseEvent) => void;
	type: "primary" | "back" | "position";
	children: ReactElement | string ;
};
export default function Button({ onClick, type, children }: ButtonProps) {
	return (
		<button className={`${styles.btn} ${styles[type]}`} onClick={() => onclick}>
			{children}
		</button>
	);
}
