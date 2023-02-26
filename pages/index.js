import React from "react";
import Signup from "../component/signUp/Signup";
import Head from "next/head";

const Home = () => {
  return (
    <>
      <Head>
        <title>Signup</title>
        <meta name="description" content="Signup" />
      </Head>
      <Signup />
    </>
  );
};

export default Home;
