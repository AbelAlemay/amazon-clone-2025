import React from "react";
import { AiOutlineMenu } from "react-icons/ai";
import classes from "./Header.module.css";

function LowerHeader() {
  return (
    <div className={classes.lower_header}>
      <ul className={classes.lower_header_list}>
        <li className={classes.lower_header_menu}>
          <AiOutlineMenu />
          <span>All</span>
        </li>
        <li>Today's Deals</li>
        <li>Customer Service</li>
        <li>Registry</li>
        <li>Gift Cards</li>
        <li>Sell</li>
      </ul>
    </div>
  );
}

export default LowerHeader;
