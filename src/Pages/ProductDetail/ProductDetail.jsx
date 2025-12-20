import React, { useEffect, useState } from "react";
import classes from "./Product.module.css";
import Layout from "../../Components/Layout/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { productUrl } from "../../Api/Endpoint";
import Rating from "@mui/material/Rating";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
import Loader from "../../Components/Loader/Loader";
import { useDataProvider } from "../../Components/DataProvider/DataProvider";
import { Type } from "../../Utilities/action.type";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [{ basket }, dispatch] = useDataProvider();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${productUrl}/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [id]);

  const addToBasket = () => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: {
        id: product.id,
        title: product.title,
        image: product.image,
        price: product.price,
        rating: product.rating,
        description: product.description,
      },
    });
  };

  return (
    <Layout>
      {isLoading ? (
        <Loader />
      ) : (
        product && (
          <div className={classes.product_detail_container}>
            <div className={classes.product_image_container}>
              <img src={product.image} alt={product.title} />
            </div>

            <div className={classes.product_info_container}>
              <h3>{product.title}</h3>

              <div className={classes.product_rating}>
                <Rating
                  name="half-rating-read"
                  defaultValue={product.rating.rate}
                  precision={0.5}
                  readOnly
                  size="small"
                />
                <small>{product.rating.count}</small>
              </div>

              <div className={classes.product_description}>
                <p>{product.description}</p>
              </div>

              <div className={classes.product_price}>
                <CurrencyFormat amount={product.price} />
              </div>

              <div className={classes.button_container}>
                <button
                  className={classes.add_to_cart_btn}
                  onClick={addToBasket}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        )
      )}
    </Layout>
  );
}

export default ProductDetail;
