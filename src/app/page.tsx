"use client";

import Head from "next/head";
import Script from "next/script";
import "../../globals.css";
import './page.scss'
import {Tokengenerator} from "./components/Tokengenerator/Tokengenerator";
import React from "react";

export default function Home() {
  return <>
    <Head>
      <link rel="shortcut icon" href={"./favicon.ico"} />
      <Script
          src={"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"}
      />
      <title>ZENIQ Tokengenerator</title>
    </Head>
    <Tokengenerator/>
  </>
}