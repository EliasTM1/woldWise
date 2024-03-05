import { LatLngLiteral } from "leaflet";
import { useState } from "react";

export function useGeolocation(
	defaultPosition: LatLngLiteral = {lat: 48.8584, lng: 2.2945} 
) {
	const [isLoading, setIsLoading] = useState(false);
	const [position, setPosition] = useState(defaultPosition);
	const [error, setError] = useState<string | null>(null);

	function getPosition() {
		if (!navigator.geolocation)
			return new Error("Your browser does not support geolocation");

		setIsLoading(true);
		navigator.geolocation.getCurrentPosition(
			(pos) => {
				setPosition({
					lat: pos.coords.latitude,
					lng: pos.coords.longitude,
				});
				setIsLoading(false);
			},
			(error) => {
				setError(error.message);
				setIsLoading(false);
			}
		);
	}

	return { isLoading, position, error, getPosition };
}
