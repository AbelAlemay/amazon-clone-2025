import React from "react";
import classes from "./Order.module.css";
import Layout from "../../Components/Layout/Layout";

function Order() {
  return (
    <Layout>
      <div className={classes.orders}>
        <h1>Your Orders</h1>
        <div className={classes.orders__order}>
          <p>You don't have any orders yet.</p>
        </div>
      </div>
    </Layout>
  );
}

export default Order;
