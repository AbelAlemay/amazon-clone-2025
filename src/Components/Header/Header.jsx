import React from "react";
import { FaSearch } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { BiCart } from "react-icons/bi";
import classes from "./Header.module.css";
import LowerHeader from "./LowerHeader";
import { Link } from "react-router-dom";
import { useDataProvider } from "../../Components/DataProvider/DataProvider";
import { auth } from "../../Utilities/firebase";

function Header() {
  const [{ basket, user }, dispatch] = useDataProvider();
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  const capitalizeFirst = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <>
      <div className={classes.header_container}>
        <div className={classes.header}>
          {/* Left Side */}
          <div className={classes.header_left}>
            {/* Logo */}
            <Link to="/">
              <img
                src="https://pngimg.com/uploads/amazon/amazon_PNG25.png"
                alt="amazon logo"
              />
            </Link>
            {/* Delivery */}
            <span className={classes.header_delivery_icon}>
              <IoLocationOutline />
            </span>

            <div className={classes.header_delivery}>
              <div className={classes.header_delivery_text}>
                <small>Deliver to</small>

                <div>
                  {user ? (
                    <>
                      <b style={{ fontStyle: "italic" }}>
                        {" "}
                        {capitalizeFirst(user?.email?.split("@")[0])}
                      </b>
                      ,
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>

              <span className={classes.header_delivery_span}>
                <b> United States</b>
              </span>
            </div>
          </div>
          {/* Search */}
          <div className={classes.header_search}>
            <select name="" id="">
              <option value="">All </option>
              <option value="">Books</option>
              <option value="">Computers & Accessories</option>
              <option value="">Electronics</option>
              <option value="">Home & Kitchen</option>
              <option value="">Kindle E-readers & Books</option>
              <option value="">Movies & TV</option>
              <option value="">Office Products</option>
              <option value="">Pet Supplies</option>
              <option value="">Sports & Outdoors</option>
              <option value="">Toys & Games</option>
              <option value="">Video Games</option>
              <option value="">Watches</option>
              <option value="">Cell Phones & Accessories</option>
              <option value="">Clothing & Accessories</option>
              <option value="">Health & Personal Care</option>
            </select>
            <input
              type="text"
              placeholder="Search Amazon"
              className={classes.header_search_input}
            />
            <span className={classes.header_search_icon}>
              <FaSearch />
            </span>
          </div>
          {/* Right Side */}
          <div className={classes.header_right}>
            <div className={classes.header_right_language}>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/960px-Flag_of_the_United_States.svg.png?20240524035322"
                alt=""
              />
              <select>
                <option value="">EN</option>
                <option value="">ES</option>
              </select>
            </div>
            <div className={classes.header_right_items}>
              {/* Sign In */}
              <Link to={!user && "/Auth"}>
                <div>
                  {user ? (
                    <>
                      <div className={classes.header_right_items_signin}>
                        <small>Hello,</small>
                        <b style={{ fontStyle: "italic" }}>
                          {capitalizeFirst(user?.email?.split("@")[0])}
                        </b>
                      </div>
                      <b onClick={() => auth.signOut()}>Sign Out</b>
                    </>
                  ) : (
                    <>
                      <p> Hello, Sign In</p>
                      <span>Accounts & Lists</span>
                    </>
                  )}
                </div>
              </Link>
              {/* Orders  */}
              <Link to="/orders">
                <p>Returns</p>
                <span>& Orders</span>
              </Link>
              {/* Cart */}
              <Link to="/cart" className={classes.cart}>
                <BiCart size={28} />
                <span>{totalItem}</span>
              </Link>
            </div>
          </div>
        </div>
        <LowerHeader />
      </div>
      <div className={classes.header_spacer}></div>
    </>
  );
}

export default Header;
