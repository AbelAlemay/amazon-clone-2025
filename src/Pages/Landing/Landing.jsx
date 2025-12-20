import React from "react";
import Layout from "../../Components/Layout/Layout";
import Carousel from "../../Components/Carousel/Carousel";
import Categories from "../../Components/Categories/Categories";
import Products from "../../Components//Products/Products";

function Landing() {
  return (
    <Layout>
      <Carousel />
      <Categories />
      <Products />
    </Layout>
  );
}

export default Landing;
