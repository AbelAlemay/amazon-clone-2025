import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import Layout from "../../Components/Layout/Layout";
import ProductCard from "../../Components/Products/ProductCard";
import { db } from "../../Utilities/firebase";
import classes from "./Order.module.css";

function Order() {
  const [{ user }] = useContext(DataContext);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    if (user) {
      const ordersRef = collection(db, "users", user.uid, "orders");
      const q = query(ordersRef, orderBy("created", "desc"));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        setOrders(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
      return () => unsubscribe();
    } else {
      setOrders([]);
    }
  }, [user]);

  return (
    <Layout>
      <section className={classes.container}>
        <div className={classes.orders__container}>
          <h1>Your Orders</h1>

          {orders?.length == 0 && (
            <p>Oops! you haven't placed any orders yet.</p>
          )}
          {/* ordered items */}
          <div>
            {orders?.map((eachOrder, i) => {
              return (
                <div key={i}>
                  <p>
                    Ordered Date:
                    {new Date(eachOrder?.data?.created * 1000).toLocaleString()}
                  </p>
                  <small
                    style={{
                      fontStyle: "italic",
                      fontSize: "11px",
                      color: "gray",
                    }}
                  >
                    Order ID: {eachOrder?.id}
                  </small>

                  {eachOrder?.data?.basket?.map((order) => (
                    <ProductCard
                      flex={true}
                      product={order}
                      key={order.id}
                      renderAdd={false}
                    />
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Order;
