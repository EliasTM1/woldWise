import { useNavigate, useSearchParams } from "react-router-dom";
import style from "./Map.module.css";

export default function Map() {
	const [searchParamas, setSearchParams] = useSearchParams();
  const navigate = useNavigate()

	function handleParams(some: number, dos: number) {
		setSearchParams({ lat: "20" , lng: "2" });
	}
	const lat = searchParamas.get("lat");
	const lng = searchParamas.get("lng");
	return (
		<div className={style.mapContainer} onClick={()=> navigate('form')}>
			<h1>Map</h1>
			<h1>
				Position: {lat}, {lng}
			</h1>
			<button onClick={() => handleParams(10, 15)}></button>
		</div>
	);
}
