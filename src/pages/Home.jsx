import { useEffect, useState } from "react";
import axios from "axios";
import Hero from "../components/Hero";
import PokemonCard from "../components/PokemonCard";

export default function Home() {
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon")
      .then((res) => {
        console.log(res.data.results);
        setPokemon(res.data.results);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Hero />
      <div className="container m-auto min-h-screen py-10">
        <p className="text-3xl text-center text-primary font-bold mb-10">
          See all the pokemon list
        </p>
        <div className="container m-auto grid grid-cols-4 gap-4 my-10">
          <PokemonCard />
          <PokemonCard />
          <PokemonCard />
          <PokemonCard />
        </div>

        {/* Pagination */}
        <div className="flex justify-center gap-6 mt-8">
          <button className="btn btn-active">Prev Page</button>
          <button className="btn btn-primary">Next Page</button>
        </div>
      </div>
    </>
  );
}
