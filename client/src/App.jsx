import React, { useContext, useEffect } from "react";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SearchResults from "./pages/SearchResults";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./pages/CheckoutForm";
import { AuthProvider,AuthContext } from "./context/UserContext";
import { check } from "./api/managetoken";

const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY);

const App = () => (
  <Elements stripe={stripePromise}>
    <Router>
      <AuthProvider>
        <Main />
      </AuthProvider>
    </Router>
  </Elements>
);
const Main = () => {
  const location = useLocation();
  const hideNavbarRoutes = ["/login", "/signup"];
  const {setauth} = useContext(AuthContext);
  useEffect(()=>{
    if(check()){
      setauth()
    }
  },[]);
  return (
    <>
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/product" element={<Product />} />
        <Route path="/searchresult" element={<SearchResults />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/payment" element={<CheckoutForm />} />
      </Routes>
      {!hideNavbarRoutes.includes(location.pathname) && <Footer />}
    </>
  );
};

export default App;
