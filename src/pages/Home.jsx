import { useEffect, useState } from "react";
import axios from "axios";
import Hero from "../components/Hero";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="container m-auto min-h-screen py-10">
        <p className="text-5xl text-center text-green-950 font-light mb-10">
          HOME
        </p>

        <p className="text-xl text-green-700 font-bold">Content Home</p>
      </div>
    </>
  );
}
