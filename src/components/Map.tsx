import { useNavigate } from "react-router-dom";
import style from "./Map.module.css";
import {
	MapContainer,
	Marker,
	Popup,
	TileLayer,
	useMap,
	useMapEvents,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { LatLngLiteral } from "leaflet";
import { useCities } from "../context/CitiesContext";
import { useGeolocation } from "../hooks/useGeolocation";
import Button from "./Button";
import { useUrlLocation } from "../hooks/useUrlLocation";

export default function Map() {
	const { cities } = useCities();
	const {
		isLoading: isLoadingPosition,
		position: geolocationPosition,
		getPosition,
	} = useGeolocation();
	const {lat, lng } = useUrlLocation()
	const [mapPosition, setMapPositon] = useState<LatLngLiteral>({
		lat: 40,
		lng: 0,
	});

	useEffect(() => {
		if (lat && lng) {
			setMapPositon({ lat, lng });
		}
	}, [lat, lng]);

	useEffect(() => {
		if(geolocationPosition){
			setMapPositon({ lat: geolocationPosition.lat , lng: geolocationPosition.lng });
		}
	}, [geolocationPosition]);
	
	return (
		<div className={style.mapContainer}>
			{ !geolocationPosition && <Button type="position" onClick={getPosition}>
				{isLoadingPosition? "Loading" : "Use your position"}
			</Button>}
			<MapContainer
				center={mapPosition}
				zoom={13}
				scrollWheelZoom={true}
				className={style.map}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
				/>
				{cities.map((city, index) => (
					<Marker position={city.position} key={index}>
						<Popup>
							<span>{city.emoji}</span>
							<span>{city.cityName}</span>
						</Popup>
					</Marker>
				))}
				<AutoCenterMap lat={mapPosition.lat} lng={mapPosition.lng} />
				<DetectClick />
			</MapContainer>
		</div>
	);
}

function AutoCenterMap({ lat, lng }: LatLngLiteral) {
	const map = useMap();
	map.setView({ lat, lng });
	return null;
}

function DetectClick() {
	const navigate = useNavigate();
	useMapEvents({
		click: (e) => {
			navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
		},
	});
	return null;
}
