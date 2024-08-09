import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import PokemonDetail from "./PokemonDetail.jsx";
import { get } from "react-hook-form";


// Type advantages
const typeAdvantages = {
  fire: ['grass', 'bug', 'ice', 'steel'],
  water: ['fire', 'ground', 'rock'],
  grass: ['water', 'ground', 'rock'],
  electric: ['water', 'flying'],
  ice: ['grass', 'ground', 'flying', 'dragon'],
  fighting: ['normal', 'ice', 'rock', 'dark', 'steel'],
  poison: ['grass', 'fairy'],
  ground: ['fire', 'electric', 'poison', 'rock', 'steel'],
  flying: ['grass', 'fighting', 'bug'],
  psychic: ['fighting', 'poison'],
  bug: ['grass', 'psychic', 'dark'],
  rock: ['fire', 'ice', 'flying', 'bug'],
  ghost: ['psychic', 'ghost'],
  dragon: ['dragon'],
  dark: ['psychic', 'ghost'],
  steel: ['ice', 'rock', 'fairy'],
  fairy: ['fighting', 'dragon', 'dark'],
};

export default function Battle() {
 // const [selectedPokemon, setSelectedPokemon] = useState(null);
  const location = useLocation();
  //getting pokemon data
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState(null);
  const [randomPokemonData, setRandomPokemonData] = useState(null);
//on hover ability details
  const [abilityDetails, setAbilityDetails] = useState(null);
  const [showRandomPopup, setShowRandomPopup] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
//battle result
  const [battleResult, setBattleResult] = useState('');
  const [totalXp, setTotalXp] = useState(0);
  const [userName, setUserName] = useState('');


  //fetching selected pokemon data
  useEffect( () => {
    if (location.state && location.state.selectedPokemon) {
      setSelectedPokemon(location.state.selectedPokemon);
      setLoading(false);
     
    } else {
      setLoading(false);
    }
  }, [location.state]);


  useEffect(() => {
    const fetchPokemonData = async () => {
      if (selectedPokemon) {
        setLoading(true);
        try {
          const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${selectedPokemon.id}`);
          setPokemonData(response.data);
          console.log(response.data);
        } catch (error) {
          console.error("Error fetching Pokémon data:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchPokemonData();
   
  }, [selectedPokemon]);

  //fetching random pokemon data
  const fetchRandomPokemonData = async () => {
    const randomId = Math.floor(Math.random() * 898) + 1; // There are 898 Pokémon in the PokeAPI
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setRandomPokemonData(data);
    } catch (error) {
      console.error("Error fetching random Pokémon data:", error);
    }
  };

 
  useEffect(() => {
    
    fetchRandomPokemonData();
  }
  , [selectedPokemon]);

  //on hover ability details
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
  //on hover ability details for random pokemon
  const handleMouseEnterRandom = async (url) => {
    try {
      const response = await axios.get(url);
      const ability = response.data;
      setAbilityDetails({
        name: ability.name,
        effect: ability.effect_entries.find(entry => entry.language.name === 'en').effect,
      });
      setShowRandomPopup(true);
    } catch (error) {
      console.error('Error fetching ability details:', error);
    }
  };

  const handleMouseLeaveRandom = () => {
    setShowRandomPopup(false);
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

  // function to get the type advantage multiplier
  const getTypeAdvantage = (attackerTypes, defenderTypes) => {
    for (let attackerType of attackerTypes) {
      for (let defenderType of defenderTypes) {
        if (typeAdvantages[attackerType]?.includes(defenderType)) {
          return 1.5; // Advantage multiplier
        }
      }
    }
    return 1; // No advantage
  };

  // function to calculate the battle result
  const calculateBattleResult = () => {
    if (pokemonData && randomPokemonData) {
      const selectedTypes = pokemonData.types.map(type => type.type.name);
      const randomTypes = randomPokemonData.types.map(type => type.type.name);

      const selectedAdvantage = getTypeAdvantage(selectedTypes, randomTypes);
      const randomAdvantage = getTypeAdvantage(randomTypes, selectedTypes);

      let selectedTotalAttack = (pokemonData.stats.find(stat => stat.stat.name === 'attack').base_stat +
                               pokemonData.stats.find(stat => stat.stat.name === 'special-attack').base_stat) * selectedAdvantage;
    let selectedTotalDefense = (pokemonData.stats.find(stat => stat.stat.name === 'defense').base_stat +
                                pokemonData.stats.find(stat => stat.stat.name === 'special-defense').base_stat) * selectedAdvantage;

    let randomTotalAttack = (randomPokemonData.stats.find(stat => stat.stat.name === 'attack').base_stat +
                             randomPokemonData.stats.find(stat => stat.stat.name === 'special-attack').base_stat) * randomAdvantage;
    let randomTotalDefense = (randomPokemonData.stats.find(stat => stat.stat.name === 'defense').base_stat +
                              randomPokemonData.stats.find(stat => stat.stat.name === 'special-defense').base_stat) * randomAdvantage;
    
                              let selectedHP = pokemonData.stats.find(stat => stat.stat.name === 'hp').base_stat;
                              let randomHP = randomPokemonData.stats.find(stat => stat.stat.name === 'hp').base_stat;
                          
                              let selectedSpeed = pokemonData.stats.find(stat => stat.stat.name === 'speed').base_stat;
let randomSpeed = randomPokemonData.stats.find(stat => stat.stat.name === 'speed').base_stat;

let battleLog = [];
let turn = 1;

while (selectedHP > 0 && randomHP > 0) {
  const selectedTurnDamage = Math.max(0, selectedTotalAttack - randomTotalDefense);
  const randomTurnDamage = Math.max(0, randomTotalAttack - selectedTotalDefense);

  if (selectedSpeed >= randomSpeed) {
    // Selected Pokémon attacks first
    randomHP -= selectedTurnDamage;
    battleLog.push(`Turn ${turn}: Selected Pokémon attacks first! Random Pokémon HP left: ${randomHP}`);
    if (randomHP <= 0) break;
    selectedHP -= randomTurnDamage;
    battleLog.push(`Turn ${turn}: Random Pokémon attacks! Selected Pokémon HP left: ${selectedHP}`);
  } else {
    // Random Pokémon attacks first
    selectedHP -= randomTurnDamage;
    battleLog.push(`Turn ${turn}: Random Pokémon attacks first! Selected Pokémon HP left: ${selectedHP}`);
    if (selectedHP <= 0) break;
    randomHP -= selectedTurnDamage;
    battleLog.push(`Turn ${turn}: Selected Pokémon attacks! Random Pokémon HP left: ${randomHP}`);
  }

  turn++;
}

if (selectedHP <= 0) {
  battleLog.push('Random Pokémon wins the battle!');
} else if (randomHP <= 0) {
  battleLog.push('Selected Pokémon wins the battle!');
  setTotalXp(prevXp => prevXp + randomPokemonData.base_experience);
}

setBattleResult(battleLog.join('\n'));
    }
  };

  //Function to send score to leaderboard
  const sendScore = async () => {
    try {
      const response = await axios.post('http://localhost:3000/leaderboard', {
        username: userName,
        score :totalXp
      });
      console.log('Battle result sent successfully:', response.data);
    } catch (error) {
      console.error('Error sending battle result:', error);
    }
  };

  // Function to fetch the score using the username
  // Work in progress
  const getScore = async () => {
    try {
      const response = await axios.post('http://localhost:3000/leaderboard/user',{
        username: userName,
      });
      setTotalXp(response.data.score);
      console.log('Score fetched successfully:', response.data);
    } catch (error) {
      console.error('Error fetching score:', error);
    }
  };

  return (
    <div className="container mx-auto min-h-screen py-10 bg-gray-100">
  <p className="text-4xl text-center text-primary font-bold mb-10">
    Battle Page
  </p>
  <div className="flex flex-col items-center gap-y-5">
    <button className="btn btn-primary mb-5" onClick={fetchRandomPokemonData}>
      Face Another Pokémon!
    </button>
    <button className="btn btn-secondary" onClick={calculateBattleResult}>
      Run Battle
    </button>
  </div>
  <div className="flex flex-col items-center py-5 gap-y-5">
    <p className="text-xl font-semibold">Total XP: {totalXp}</p>
    <div className="flex flex-col items-center gap-y-2">
      <label htmlFor="userName" className="text-lg font-medium">
        Enter your name:
      </label>
      <input
        type="text"
        id="userName"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        className="input input-bordered w-full max-w-xs"
      />
    </div>
    {userName && (
      <div className="flex flex-col items-center gap-y-2 mt-5">
        <p className="text-lg">Hello, {userName}! Click to post your score!</p>
        <button onClick={getScore} className="btn btn-accent">
          Get your score! 
        </button>
        <button onClick={sendScore} className="btn btn-accent">
          Post your score!
        </button>
      </div>
    )}
  </div>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : selectedPokemon && pokemonData ? (
        <div className="flex flex-row justify-center gap-x-10">
          <div className="card bg-neutral w-2/3 text-neutral-content">
            <figure className="">
              <img src={pokemonData.sprites.front_default} alt={pokemonData.name} className="w-48 h-48" />
            </figure>
            <div className="card-body items-center text-center">
              <div className="flex flex-row gap-x-2">
                {pokemonData.types.map((pokeType, index) => (
                  <span key={index} className={`badge ${getColorClass(pokeType.type.name)}`}>
                    {pokeType.type.name}
                  </span>
                ))}
              </div>
              <div className="flex flex-row gap-x-2">
        <p className="badge-sm rounded badge-ghost">Height: {pokemonData.height}</p>
        <p className="badge-sm rounded badge-ghost">Weight: {pokemonData.weight}</p>
        </div>
        <p className="badge-m p-1 rounded badge-ghost">Base Experience: {pokemonData.base_experience}</p>
        <p>Abilities:</p>
        <ul className="flex flex-row gap-x-2">
          {pokemonData.abilities.map((ability, index) => (
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
                {pokemonData.stats.map((stat, index) => (
                  <li key={index} className={`badge-m m-1 text-white rounded badge-ghost ${getColorClass(stat.stat.name)}`}>
                    {stat.stat.name}: {stat.base_stat}
                  </li>
                ))}
              </ul>
              <div className="card-actions justify-end"></div>
            </div>
          </div>
          {randomPokemonData && (
            <div className="card bg-neutral w-2/3 text-neutral-content">
              <figure className="">
                <img src={randomPokemonData.sprites.front_default} alt={randomPokemonData.name} className="w-48 h-48" />
              </figure>
              <div className="card-body items-center text-center">
                <div className="flex flex-row gap-x-2">
                  {randomPokemonData.types.map((pokeType, index) => (
                    <span key={index} className={`badge ${getColorClass(pokeType.type.name)}`}>
                      {pokeType.type.name}
                    </span>
                  ))}
                </div>
                <div className="flex flex-row gap-x-2">
        <p className="badge-sm rounded badge-ghost">Height: {randomPokemonData.height}</p>
        <p className="badge-sm rounded badge-ghost">Weight: {randomPokemonData.weight}</p>
        </div>
        <p className="badge-m p-1 rounded badge-ghost">Base Experience: {randomPokemonData.base_experience}</p>
        <p>Abilities:</p>
        <ul className="flex flex-row gap-x-2">
          {randomPokemonData.abilities.map((ability, index) => (
            <li key={index} className="badge-m m-1 rounded badge-ghost"
            onMouseEnter={() => handleMouseEnterRandom(ability.ability.url)}
            onMouseLeave={handleMouseLeaveRandom}
            >
              {ability.ability.name}
            </li>
          ))}
        </ul>
        {showRandomPopup && abilityDetails && (
              <div className="popup bg-white p-4 rounded shadow-lg">
                <h3 className="text-lg text-black font-bold">{abilityDetails.name}</h3>
                <p className="text-black">{abilityDetails.effect}</p>
              </div>
            )}
                <p>Stats:</p>
                <ul>
                  {randomPokemonData.stats.map((stat, index) => (
                    <li key={index} className={`badge-m m-1 text-white rounded badge-ghost ${getColorClass(stat.stat.name)}`}>
                      {stat.stat.name}: {stat.base_stat}
                    </li>
                  ))}
                </ul>
                <div className="card-actions justify-end"></div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <p className="text-center">Select a Pokémon to start the battle.</p>
      )}
      {battleResult && (
  <div className="bg-base-200 border border-base-300 rounded-lg p-5 max-w-xl mx-auto mt-5">
    <h2 className="text-2xl font-bold mb-4 text-center">Battle Result</h2>
    <pre className="font-mono text-base whitespace-pre-line">{battleResult}</pre>
  </div>
)}
    </div>
  );
}
