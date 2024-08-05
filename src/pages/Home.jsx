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
        <div className="join">
          <button className="join-item btn">«</button>
          <button className="join-item btn">Page 22</button>
          <button className="join-item btn">»</button>
        </div>
      </div>
    </>
  );
}

// {
//   diaries
//     .map((diary) => <DiaryCard key={diary.id} diary={diary} />)
//     .slice(1);
// }
