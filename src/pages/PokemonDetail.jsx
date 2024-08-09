import { useState, useEffect,  } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
export default function PokemonDetail() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [abilityDetails, setAbilityDetails] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const fetchPokemon = async () => {
      try { 
        const data = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const pokemon = data.data;
      setPokemon(pokemon);
      } catch (error) {
        console.log('Failed to fetch the pokemon data:', error);
      }
    };
    fetchPokemon();
  }, [id]);

  const handleMouseEnter = async (url) => {
    try {
      const response = await axios.get(url);
      const ability = response.data;
      setAbilityDetails({
        name: ability.name,
        effect: ability.effect_entries.find(entry => entry.language.name === 'en').effect,
      });
      setShowPopup(true);
    } catch (error) {
      console.error('Error fetching ability details:', error);
    }
  };

  const handleMouseLeave = () => {
    setShowPopup(false);
    setAbilityDetails(null);
  };

  // function to get the color class based on the stat name
  const getColorClass = (statName) => {
    switch (statName) {
      case 'hp':
        return 'bg-green-500';
      case 'attack':
        return 'bg-red-500';
      case 'defense':
        return 'bg-blue-500';
      case 'special-attack':
        return 'bg-red-700';
      case 'special-defense':
        return 'bg-blue-700';
      case 'speed':
        return 'bg-yellow-500';
      default:
        return 'bg-black';
    }
  };


//saving to local storage
useEffect(() => {
  if (pokemon) {
    const storePokemon = JSON.parse(localStorage.getItem("myPokemon")) || [];
    const existingItem = storePokemon.find((item) => item.id === pokemon.id);
    if (existingItem) {
      setIsSaved(true);
    }
  }
}, [pokemon]);

  function handleSave(e) {
    e.preventDefault();

    const storePokemon = JSON.parse(localStorage.getItem("myPokemon")) || [];
    const newItem = { name: pokemon.name, id: pokemon.id, image: pokemon.sprites.front_default };

    // Check if an item with the same ID already exists
    const existingItem = storePokemon.find((item) => item.id === newItem.id);
    if (existingItem) {
      // Handle duplicate ID case (you can customize this behavior)
      console.log("Item with ID", newItem.id, "already exists!");
      return;
    }

    // Add the new item to the array
    storePokemon.push(newItem);
    localStorage.setItem("myPokemon", JSON.stringify(storePokemon));
    setIsSaved(true);
  }

  if (!pokemon) {
    return <div>Loading...</div>;
  }


  console.log(pokemon);
  return (
    <>
    <div className="container m-auto min-h-screen py-10 flex flex-col items-center">
    <p className="text-3xl text-center text-primary font-bold mb-10">
          Pokemon Details
        </p>
    <div className="card bg-neutral w-2/3  text-neutral-content">
      <figure className="">
        <img src={pokemon.sprites.front_default} alt={pokemon.name}  className="w-48 h-48" />
      </figure>

      <div className="card-body items-center text-center">
        <div className="flex flex-row gap-x-2">
          {pokemon.types.map((pokeType, index) => (
            <div
              key={index}
              className={`badge badge-${
                index % 3 === 0
                  ? "primary"
                  : index % 3 === 1
                  ? "secondary"
                  : "accent"
              }`}
            >
              {pokeType.type.name}
            </div> 
          ))} 
        </div>
        <h2 className="card-title capitalize">{pokemon.name}</h2>
        <div className="flex flex-row gap-x-2">
        <p className="badge-sm rounded badge-ghost">Height: {pokemon.height}</p>
        <p className="badge-sm rounded badge-ghost">Weight: {pokemon.weight}</p>
        </div>
        <p className="badge-m p-1 rounded badge-ghost">Base Experience: {pokemon.base_experience}</p>
        <p>Abilities:</p>
        <ul className="flex flex-row gap-x-2">
          {pokemon.abilities.map((ability, index) => (
            <li key={index} className="badge-m m-1 rounded badge-ghost"
            onMouseEnter={() => handleMouseEnter(ability.ability.url)}
            onMouseLeave={handleMouseLeave}
            >
              {ability.ability.name}
            </li>
          ))}
        </ul>
        {showPopup && abilityDetails && (
              <div className="popup bg-white p-4 rounded shadow-lg">
                <h3 className="text-lg text-black font-bold">{abilityDetails.name}</h3>
                <p className="text-black">{abilityDetails.effect}</p>
              </div>
            )}
        <p>Stats:</p>
        <ul>
          {pokemon.stats.map((stat, index) => (
            <li key={index} className={`badge-m m-1 text-white rounded badge-ghost ${getColorClass(stat.stat.name)}`}>
              {stat.stat.name}: {stat.base_stat}
            </li>
          ))}
        </ul>
        <div className="card-actions justify-end">
          <button onClick={handleSave} className="btn  btn-sm btn-secondary">
            {isSaved ? "In your roster" : "Catch it"}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
          
        </div>
      </div>
    </div>
    </div>
  </>
  );
}
