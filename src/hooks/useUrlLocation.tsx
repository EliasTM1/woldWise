import { useSearchParams } from "react-router-dom";

export function useUrlLocation() {
    const [searchParamas] = useSearchParams();
    const lat = Number(searchParamas.get("lat"));
	const lng = Number(searchParamas.get("lng"));
    return {lat, lng}
}