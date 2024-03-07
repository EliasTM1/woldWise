import { useEffect, ReactNode } from "react";
import { useFakeAuth } from "../context/FakeAuthContext";
import { useNavigate } from "react-router-dom";
type ProtectedRoutesProps = {
	children: ReactNode
}

export default function ProtectedRoutes({children}: ProtectedRoutesProps) {
	const { isAuthenticated } = useFakeAuth();
	const navigate = useNavigate();
	useEffect(
		function () {
			if (!isAuthenticated) navigate("/");
			console.log(isAuthenticated, "IS AUTH")
		},
		[isAuthenticated, navigate]
	);
	return isAuthenticated ? children : null;
}
