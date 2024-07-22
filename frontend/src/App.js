import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import GuestNavbar from "./components/NavBar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AddCrimeSceneForm from "./pages/AddScene";
import AddCrimeForm from "./pages/AddCrimeForm";
import SafetyTips from "./pages/SafetyTips";
import SuccessPage from "./pages/SuccessPage";
import AllCrimes from "./pages/AllCrimes";
import Analytics from "./pages/Analytics";
import LineChart from "./pages/Analytics";
import ThreatAlerts from "./pages/ThreatAlerts";
import ProfileSettings from "./pages/ProfileSettings";

function App() {
  const isLoggedIn = () => {
    return localStorage.getItem("authenticated") === "true";
  };

  // PrivateRoute component to handle redirection
  const PrivateRoute = ({ element, ...props }) => {
    return isLoggedIn() ? (
      element
    ) : (
      <Navigate to="/login" state={{ from: props.location }} />
    );
  };

  return (
    <BrowserRouter>
      <GuestNavbar />
      <Routes>
      <Route exact path="/" element={<Home />} />
        <Route exact path="/crimes" element={<AllCrimes />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/success" element={<SuccessPage />} />
        <Route exact path="/dashboard/analytics" element={<LineChart />} />
        <Route exact path="/dashboard/threats" element={<ThreatAlerts />} />
        <Route exact path="/dashboard/settings" element={<ProfileSettings />} />
        <Route
          path="/dashboard"
          element={<PrivateRoute element={<Dashboard />} />}
        />
        <Route
          path="/dashboard/add-crime"
          element={<PrivateRoute element={<AddCrimeForm />} />}
        />
        <Route
          exact
          path="/add-crime-scene"
          element={<AddCrimeSceneForm />}
        />
        <Route exact path="/safety-tips" element={<SafetyTips />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
