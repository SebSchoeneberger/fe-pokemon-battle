import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";


export default function Search() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (search) {
      try {
        // Check if the Pokémon exists
        await axios.get(`https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`);
        navigate(`/pokemon/${search.toLowerCase()}`);
      } catch (error) {
        // If the Pokémon is not found, show a toast notification
        toast.error(`No Pokémon found with the name "${search}"`);
      }
    }
    setSearch('');
  };

  return (
    <form onSubmit={handleSubmit} className="input input-bordered flex items-center gap-2">
      <input
        type="text"
        className="grow"
        placeholder="Search"
        value={search}
        onChange={handleChange} />
      <button type="submit">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70"
        >
          <path
            fillRule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </form>
  );
}
