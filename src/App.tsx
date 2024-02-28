// import { useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PageNotFound from "./pages/PageNotFound";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";

function App() {
	// const [count, setCount] = useState(0)

	return (
		<>
			<h1>HELLO</h1>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<HomePage />}></Route>
					<Route path='product' element={<Product />}></Route>
					<Route path='pricing' element={<Pricing />}></Route>
					<Route path='*' element={<PageNotFound />}></Route>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
