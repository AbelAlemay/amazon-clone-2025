import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing/Landing";
import Auth from "./Pages/Auth/Auth";
import Orders from "./Pages/Orders/Order";
import Payment from "./Pages/Payments/Payment";
import Cart from "./Pages/Cart/Cart";
import Results from "./Pages/Results/Results";
import ProductDetail from "./Pages/ProductDetail/ProductDetail";
import ProtectedRoutes from "./Components/ProtectedRoutes/ProtectedRoutes";

const stripePromise = loadStripe(
  "pk_test_51ShZElFOWRrJ116qsICUOa2BTDNxVXPsJ1ulBK7DJyBpOwusiuDBcuziAN2mK7tNXhllozOBu8otPGZQUSUyovk800JrVsTSxh"
);
function Routing() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/Auth" element={<Auth />} />
          <Route
            path="/orders"
            element={
              <ProtectedRoutes
                msg="Please Sign in to see your orders"
                redirect="/orders"
              >
                <Orders />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/payments"
            element={
              <ProtectedRoutes
                msg="Please Sign in to Continue"
                redirect="/payments"
              >
                <Elements stripe={stripePromise}>
                  <Payment />
                </Elements>
              </ProtectedRoutes>
            }
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="/CategoryName/:name" element={<Results />} />
          <Route path="/Product/:id" element={<ProductDetail />} />
        </Routes>
      </Router>
    </div>
  );
}

export default Routing;
