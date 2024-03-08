// import { useState } from 'react'
import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { CitiesProvider } from "./context/CitiesContext";
import { AuthProvider } from "./context/FakeAuthContext";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import ProtectedRoutes from "./pages/ProtectedRoutes";
import SpinnerFullPage from "./components/SpinnerFullPage";
// import PageNotFound from "./pages/PageNotFound";
// import Product from "./pages/Product";
// import Pricing from "./pages/Pricing";
// import AppLayout from "./pages/AppLayout";
// import HomePage from "./pages/Homepage";
// import Login from "./pages/Login";

const HomePage = lazy(() => import("./pages/Homepage"))
const Product = lazy(() => import("./pages/Homepage"))
const Pricing = lazy(() => import("./pages/Homepage"))
const Login = lazy(() => import("./pages/Homepage"))
const AppLayout = lazy(() => import("./pages/Homepage"))
const PageNotFound = lazy(() => import("./pages/Homepage"))

function App() {
	return (
		<AuthProvider>
			<CitiesProvider>
				<Suspense fallback={<SpinnerFullPage/>}>
					<Routes>
						<Route path='/' element={<HomePage />}></Route>
						<Route path='product' element={<Product />}></Route>
						<Route path='pricing' element={<Pricing />}></Route>
						<Route
							path='app'
							element={
								<ProtectedRoutes>
									<AppLayout />
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
				</Suspense>
			</CitiesProvider>
		</AuthProvider>
	);
}

export default App;
