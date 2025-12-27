import React, { useState, useEffect, useContext } from "react";
import "./App.css";
import Routing from "./Router";
import { auth } from "./Utilities/firebase";
import { DataContext } from "./Components/DataProvider/DataProvider";
import Loader from "./Components/Loader/Loader";

function App() {
  const [{ user }, dispatch] = useContext(DataContext);
  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // user is logged in
        console.log(authUser);
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        // user is logged out
        console.log("user is logged out");
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
      setIsAuthReady(true);
    });
  }, []);

  return isAuthReady ? (
    <div>
      <Routing />
    </div>
  ) : (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "50vh",
      }}
    >
      <Loader />
    </div>
  );
}

export default App;
