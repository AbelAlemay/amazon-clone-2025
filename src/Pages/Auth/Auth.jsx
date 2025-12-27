import classes from "./Signup.module.css";
// import Layout from "../../Components/Layout/Layout";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { auth } from "../../Utilities/firebase";
import { useState, useContext } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import { ClipLoader } from "react-spinners";
function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [{ user }, dispatch] = useContext(DataContext);
  const [loading, setLoading] = useState({ signin: false, signup: false });
  const navigate = useNavigate();
  const navStateData = useLocation();
  const { msg, redirect } = navStateData.state || {};

  // console.log(email);
  // console.log(password);
  console.log(user);
  const authHandler = async (e) => {
    e.preventDefault();
    // console.log(e.target.name);
    try {
      if (e.target.name === "signin") {
        setLoading({ ...loading, signin: true });
        const userInfo = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        dispatch({ type: "SET_USER", user: userInfo.user, payload: email });
        // alert("Sign-in successful");
        setLoading({ ...loading, signin: false });
        navigate(navStateData?.state?.redirect || "/");
      } else if (e.target.name === "signup") {
        setLoading({ ...loading, signup: true });
        const userInfo = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        setLoading({ ...loading, signup: false });
        console.log("User created successfully");
        dispatch({ type: "SET_USER", user: userInfo.user, payload: email });
        navigate(navStateData?.state?.redirect || "/");
        // alert("Sign-up successful");
      }
    } catch (error) {
      setLoading({ ...loading, signup: false });
      console.log(error.message);
      setError(error.message);
      // alert(error.message);
    }
  };
  return (
    <section className={classes.auth__section}>
      <div className={classes.auth__logo}>
        <Link to="/">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Amazon_2024.svg/2560px-Amazon_2024.svg.png"
            alt="Amazon Logo"
          />
        </Link>
      </div>
      {navStateData?.state?.msg && <p style={{ color: "red" }}>{msg}</p>}
      <div>
        <form className={classes.auth__form} action="">
          <h2>Sign-In</h2>
          <label htmlFor="email">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            id="email"
            name="email"
            required
          />
          <label htmlFor="password">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
            name="password"
            required
          />
          <button
            type="submit"
            onClick={authHandler}
            className={classes.auth__button__signin}
            name="signin"
          >
            {loading?.signin ? (
              <ClipLoader color="black" size={15} />
            ) : (
              "Sign In"
            )}
          </button>
          <p>
            By Signing In, you agree to the AMAZON FAKE CLONE Conditions of Use
            & Sale. Please see our Privacy Notice, our Cookies Notice and our
            Interest-Based Ads Notice.
          </p>
          <Link to="/signup">
            <button
              onClick={authHandler}
              className={classes.auth__button__signup}
              type="submit"
              name="signup"
            >
              {loading?.signup ? (
                <ClipLoader color="black" size={15} />
              ) : (
                "Create your Amazon Account"
              )}
            </button>
            {error && (
              <small style={{ marginTop: "10px", color: "red" }}>{error}</small>
            )}
          </Link>
        </form>
      </div>
    </section>
  );
}

export default Auth;
