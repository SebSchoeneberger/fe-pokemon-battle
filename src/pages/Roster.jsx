import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import Skeleton from "../components/Skeleton";

export default function Roster() {
  const [roster, setRoster] = useState([]);
 
  const navigate = useNavigate();
  useEffect(() => {
    const myPoke = JSON.parse(localStorage.getItem("myPokemon"));
    if (myPoke) {
      setRoster(myPoke);
    }
  }, []);


  const handleBattleClick = (p) => {
    const selectedPokemon = { id: p.id };
    navigate('/battle', { state: { selectedPokemon } });
  };

  return (
    <>
      <div className="container m-auto min-h-screen py-10">
        <p className="text-3xl text-center text-primary font-bold mb-10">
          Roaster pager
        </p>

        <div className="container m-auto grid grid-cols-4 gap-4 my-10">
          {roster.length > 0 ? (
            roster.map((p) => (
              <div
                key={p.name}
                className="card card-compact bg-neutral text-neutral-content"
              >
                <figure className="p-2">
                  <img src={p.image} alt={p.name} />
                </figure>
                <div className="card-body items-center text-center">
                  <h2 className="card-title capitalize">{p.name}</h2>
                  <div className="card-actions justify-end">
                    
                      <button  onClick={()=> handleBattleClick(p)} className="btn btn-sm btn-secondary">
                        Battle
                      </button>
                  
                    <Link to={`/pokemon/${p.name}`}>
                      <button className="btn btn-sm btn-accent">More</button>
                    </Link>{" "}
                    <button
                      className="btn btn-sm btn-default"
                      // onClick={handleRemove}
                    >
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
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <>
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
            </>
          )}
          {/* {} */}
        </div>
      </div>
    </>
  );
}
