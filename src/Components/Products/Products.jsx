import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import classes from "./Products.module.css";

function Products() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className={classes.products_container}>
      {products.map((item) => (
        <ProductCard key={item.id} product={item} />
      ))}
    </div>
  );
}

export default Products;
