import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import Banner from "./Banner";
import Newfilm from "./Newfilm";
import Currentfilm from "./Currentfilm";
import Shortfilm from "./Shortfilm";
import Longfilm from "./Longfilm";
import TVshowslist from "./TVshowslist";
import "../css/homepage.css";

const homepage = () => {
  return (
    <>
      <Header />
      <Banner />
      <Newfilm />
      <Currentfilm />
      <Shortfilm />
      <Longfilm />
      <TVshowslist />
      <Footer />
    </>
  );
};

export default homepage;
