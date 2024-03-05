import { useNavigate } from "react-router-dom";
import Button from "./Button";

export const BackButton = () => {
	const navigate = useNavigate();

	const handleBack = (e: MouseEvent) => {
		e.preventDefault()
		navigate(-1);
	};
	return (
		<Button onClick={handleBack} type='back'>
			&larr; Back
		</Button>
	);
};
