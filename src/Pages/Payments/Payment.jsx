import classes from "./Payment.module.css";
import Layout from "../../Components/Layout/Layout";
import { useState, useContext } from "react";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Products/ProductCard";
import { useElements, useStripe, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
import { instance } from "../../Api/axios";
import ClipLoader from "react-spinners/ClipLoader";
import { db } from "../../Utilities/firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Type } from "../../Utilities/action.type";

function Payment() {
  const [{ user, basket }, dispatch] = useContext(DataContext);
  const totalItems = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);
  const totalPrice = basket?.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const handleChange = (e) => {
    setCardError(e.error?.message || null);
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    setProcessing(true);

    // 1. Backend call
    try {
      const response = await instance({
        method: "post",
        url: `/payments/create?total=${totalPrice}`,
      });
      console.log(response.data);
      const clientSecret = response.data?.clientSecret;
      // 2. Client Side Validation
      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });
      // console.log(paymentIntent);
      // 3. Firestore database save and clear basket
      await setDoc(
        doc(collection(db, "users", user?.uid, "orders"), paymentIntent.id),
        {
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        }
      );
      // Empty the basket
      dispatch({ type: Type.EMPTY_BASKET });
      setProcessing(false);
      navigate("/orders", { state: { msg: "Payment Successful" } });
    } catch (error) {
      console.log(error);
      setProcessing(false);
    }
  };
  return (
    <Layout>
      {/* header */}
      <div className={classes.header}>Checkout ({totalItems}) items </div>
      {/* Payment Method */}
      <section className={classes.paymentMethod}>
        <div></div>
        {/* address */}
        <div className={classes.flex}>
          <h3>Deliver to:</h3>
          <div>
            <p>{user?.email}</p>
            <p>123 Main St</p>
            <p>New York, NY 10001</p>
          </div>
        </div>
        <hr />
        {/* order summary */}
        <div className={classes.flex}>
          <h3>Order Summary</h3>
          <div>
            {basket?.map((item) => (
              <ProductCard
                product={item}
                key={item.id}
                flex={true}
                renderAdd={false}
              />
            ))}
          </div>
        </div>
        <hr />
        {/* place order */}
        <div className={classes.flex}>
          <h3>Payment Methods</h3>
          <div className={classes.payment_container}>
            <form onSubmit={handlePayment}>
              {cardError && (
                <small
                  style={{ paddingBottom: "15px", color: "red" }}
                  className={classes.error}
                >
                  {cardError}
                </small>
              )}
              <CardElement onChange={handleChange} />
              {/* price */}
              <div>
                <div className={classes.price}>
                  <span>
                    Total ({totalItems} items)
                    <div className={classes.vertical_bar}></div>
                    <CurrencyFormat amount={totalPrice} />:
                  </span>
                </div>
                <button type="submit" className={classes.pay__button}>
                  {processing ? (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "5px",
                      }}
                    >
                      <ClipLoader
                        color="white"
                        loading={processing}
                        size={12}
                      />
                      <span style={{ marginLeft: "5px" }}>Please wait</span>
                    </div>
                  ) : (
                    "Pay Now"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Payment;
