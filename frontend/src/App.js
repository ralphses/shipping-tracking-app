import React from "react";
import "./App.css";
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import GuestNavbar from "./components/NavBar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import CreateAccountPage from "./pages/CreateAccountPage";
import ViewShippingOrdersPage from "./pages/ViewShippingOrdersPage";
import CreateOrderPage from "./pages/CreateOrderPage";
import TrackOrderPage from "./pages/TrackOrderPage";
import ContactUsPage from "./pages/ContactUsPage";
import ShippingOrderPage from "./pages/ShippingOrderPage";

function App() {
    const isLoggedIn = () => {
        return localStorage.getItem("authenticated") === "true";
    };

    // PrivateRoute component to handle redirection
    const PrivateRoute = ({element, ...props}) => {
        return isLoggedIn() ? (
            element
        ) : (
            <Navigate to="/login" state={{from: props.location}}/>
        );
    };

    return (
        <BrowserRouter>
            <GuestNavbar/>
            <Routes>
                <Route exact path="/" element={<Home/>}/>
                <Route exact path="/register" element={<CreateAccountPage/>}/>
                <Route exact path="/orders" element={<ViewShippingOrdersPage/>}/>
                <Route exact path="/orders/create" element={<CreateOrderPage/>}/>
                <Route exact path="/orders/track" element={<TrackOrderPage/>}/>
                <Route exact path="/order/view/:orderId" element={<ShippingOrderPage/>}/>
                <Route exact path="/contact" element={<ContactUsPage/>}/>
            </Routes>
            <Footer/>
        </BrowserRouter>
    );
}

export default App;
