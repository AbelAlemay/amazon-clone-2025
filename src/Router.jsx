import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing/Landing";
import SignIn from "./Pages/Auth/SignUp";
import Orders from "./Pages/Orders/Order";
import Payment from "./Pages/Payments/Payment";
import Cart from "./Pages/Cart/Cart";
import Results from "./Pages/Results/Results";
import ProductDetail from "./Pages/ProductDetail/ProductDetail";
function Routing() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/CategoryName/:name" element={<Results />} />
          <Route path="/Product/:id" element={<ProductDetail />} />
        </Routes>
      </Router>
    </div>
  );
}

export default Routing;
