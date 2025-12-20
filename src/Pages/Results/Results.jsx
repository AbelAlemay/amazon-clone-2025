
import classes from "./Results.module.css";
import Layout from "../../Components/Layout/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { productUrl } from "../../Api/Endpoint";
import { useState, useEffect } from "react";
import ProductCard from "../../Components/Products/ProductCard";

function Results() {
  const { name } = useParams();
  console.log(name);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get(`${productUrl}/products/category/${name}`).then((response) => {
      console.log(response.data);
      const products = response.data;
      console.log(products);
      setProducts(products);
    });
  }, [name]);
  return (
    <Layout>
      <section>
        <h1 style={{ padding: "30px" }}>{name}</h1>
        <p style={{ padding: "30px" }}>Category / {name}</p>
        <hr />
        <div className={classes.products_container}>
          {products?.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </section>
    </Layout>
  );
}

export default Results;
