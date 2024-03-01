// import { useState } from 'react'
import { Route, Routes } from "react-router-dom";
import PageNotFound from "./pages/PageNotFound";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import AppLayout from "./pages/AppLayout";
import HomePage from "./pages/Homepage";
import Login from "./pages/Login";
import { useEffect, useState } from "react";
import { City as TypeCity } from "./types/country";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";

const BASE_URL = "http://localhost:4444";

function App() {
	const [cities, setCities] = useState<TypeCity[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	useEffect(function () {
		async function fetchCities() {
			try {
				setIsLoading(true);
				const response = await fetch(`${BASE_URL}/cities`);
				const data = await response.json();
				console.log(data, "THIS IS MY DATA");
				setCities(data);
			} catch {
				console.log("There was an error loading your data");
			} finally {
				setIsLoading(false);
			}
		}
		fetchCities();
	}, []);
	return (
		<Routes>
			<Route path='/' element={<HomePage />}></Route>
			<Route path='product' element={<Product />}></Route>
			<Route path='pricing' element={<Pricing />}></Route>
			<Route path='app' element={<AppLayout />}>
				{/* Adding the index prop we can show this route in case no
				 other child route is match when accessing */}
				<Route
					index
					element={<CityList cities={cities} isLoading={isLoading} />}
				></Route>
				<Route
					path='cities'
					element={<CityList cities={cities} isLoading={isLoading} />}
				></Route>
				<Route
					path='cities/:id'
					element={<City />}
				></Route>
				<Route
					path='countries'
					element={<CountryList  countries={cities} isLoading={isLoading} />}
				></Route>
				<Route path='form' element={<Form/>}></Route>
			</Route>
			<Route path='login' element={<Login />}></Route>
			<Route path='*' element={<PageNotFound />}></Route>
		</Routes>
	);
}

export default App;
