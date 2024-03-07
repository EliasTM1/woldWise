// import { useState } from 'react'
import { Navigate, Route, Routes } from "react-router-dom";
import PageNotFound from "./pages/PageNotFound";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import AppLayout from "./pages/AppLayout";
import HomePage from "./pages/Homepage";
import Login from "./pages/Login";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import { CitiesProvider } from "./context/CitiesContext";
import ProtectedRoutes from "./pages/ProtectedRoutes";
import { AuthProvider } from "./context/FakeAuthContext";

function App() {
	return (
		<AuthProvider>
			<CitiesProvider>
				<Routes>
					<Route path='/' element={<HomePage />}></Route>
					<Route path='product' element={<Product />}></Route>
					<Route path='pricing' element={<Pricing />}></Route>
					<Route
						path='app'
						element={
							<ProtectedRoutes>
								<AppLayout />
								//{" "}
							</ProtectedRoutes>
						}
					>
						{/* Adding the index prop we can show this route in case no
				 		other child route is match when accessing */}
						<Route index element={<Navigate replace to='cities' />}></Route>
						<Route path='cities' element={<CityList />}></Route>
						<Route path='cities/:id' element={<City />}></Route>
						<Route path='countries' element={<CountryList />}></Route>
						<Route path='form' element={<Form />}></Route>
					</Route>
					<Route path='login' element={<Login />}></Route>
					<Route path='*' element={<PageNotFound />}></Route>
				</Routes>
			</CitiesProvider>
		</AuthProvider>
	);
}

export default App;
