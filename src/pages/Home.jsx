/* eslint-disable no-unused-vars */
import React from "react";
import Nav from "../components/Nav";
import Features from "../components/Features";
import Footer from "../components/Footer";
import UserCard from "../components/UserCard";

const Home = () => {
  return (
    <>
      <Nav />
      <UserCard />
      <Features />
      <Footer />
    </>
  );
};

export default Home;
