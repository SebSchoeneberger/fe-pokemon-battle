import { useEffect, useState } from "react";
import axios from "axios";
import Hero from "../components/Hero";
import PokemonCard from "../components/PokemonCard";

export default function Home() {
  const [pokemon, setPokemon] = useState([]);
  
  const [start, setStart] = useState(1);
  const [end, setEnd] = useState(20);
  useEffect(() => {
    const fetchPokemon = async () => {
      const pokemonArr = [];
      for (let i = start; i <= end; i++) {
        const data = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`);
        pokemonArr.push(data.data);
      }
      setPokemon(pokemonArr);
    };
    fetchPokemon();
  }, [start, end]);

  // Pagination handlers / gets prev value of state and adds 20 to it
  const handleNext = () => {
    setStart((prevStart) => prevStart + 20);
    setEnd((prevEnd) => prevEnd + 20);
  };

  // Pagination handlers / gets prev value of state and subtracts 20 from it
  const handlePrev = () => {
    setStart((prevStart) => prevStart - 20);
    setEnd((prevEnd) => prevEnd - 20);
  };

  return (
    <>
      <Hero />
      <div className="container m-auto min-h-screen py-10">
        <p className="text-3xl text-center text-primary font-bold mb-10">
          See all the pokemon list
        </p>
        <div className="container m-auto grid grid-cols-4 gap-4 my-10">
          {pokemon.map((poke) => (
            <PokemonCard
              key={poke.id}
              id={poke.id}
              image={poke.sprites.front_default}
              name={poke.name}
              types={poke.types.map((type) => type.type.name)}
            />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center gap-6 mt-8">
          <button className="btn btn-active" onClick={handlePrev} disabled={start === 1}>Prev Page</button>
          <button className="btn btn-primary" onClick={handleNext}>Next Page</button>
        </div>
      </div>
    </>
  );
}
