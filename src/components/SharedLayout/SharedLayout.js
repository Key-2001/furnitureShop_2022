import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import MessengerCustomerChat from "react-messenger-customer-chat";

const SharedLayout = (props) => {
  return (
    <>
      <MessengerCustomerChat
        pageId="108187095127208"
        appId="811703723654292"
      />
      <Navbar props={props} />
      <Sidebar props={props} />
      <Outlet />
    </>
  );
};

export default SharedLayout;
