import { useEffect, useState } from "react";
import axios from "axios";
import { json, Link } from "react-router-dom";

export default function Roster() {
  const [pokemon, setPokemon] = useState([]);
  const [name, setName] = useState(
    JSON.parse(localStorage.getItem("myPokemon"))
  );

  const id = name.map((n) => n.id);

  const url = "https://pokeapi.co/api/v2/pokemon/";

  useEffect(() => {
    axios
      .get(`${url}${id}`)
      .then((res) => {
        setPokemon(res.data.results);
        console.log(res.data.results);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="container m-auto min-h-screen py-10">
        <p className="text-3xl text-center text-primary font-bold mb-10">
          Roaster page
        </p>

        <div className="container m-auto grid grid-cols-4 gap-4 my-10"></div>
      </div>
    </>
  );
}

// export default function Roster() {
//   const [pokemon, setPokemon] = useState([]);
//   const [name, setName] = useState(localStorage.getItem("myPokemon"));

//   let n = name.map;
//   const url = "https://pokeapi.co/api/v2/pokemon/";
//   const [nextUrl, setnextUrl] = useState();
//   const [prevUrl, setprevUrl] = useState();

//   const myPoke = JSON.parse(localStorage.getItem("myPokemon"));
//   console.log(myPoke);

//   let i = myPoke.map((p) => url + p);
//   // console.log(i);

//   useEffect(() => {
//     axios
//       .get(`${url}`)
//       .then((res) => {
//         setPokemon(res.data.results);

//         // setnextUrl(res.data.next);
//         // setprevUrl(res.data.previous);
//       })
//       .catch((err) => console.log(err));
//   }, []);

//   return (
//     <>
//       <div className="container m-auto min-h-screen py-10">
//         <p className="text-3xl text-center text-primary font-bold mb-10">
//           Roaster page
//         </p>
//         <div className="container m-auto grid grid-cols-4 gap-4 my-10"></div>
//       </div>
//     </>
//   );
// }

// function handleSave(e) {
//   e.preventDefault();
//   const storePokemon =
//     JSON.parse(localStorage.getItem("myRoster")) || [];
//   storePokemon.push(p);

//   localStorage.setItem("myRoster", JSON.stringify(storePokemon));
//   console.log(p.name);
// }

// function handleRemove(e) {
//   e.preventDefault();
// }

// <div
//   className="card bg-neutral text-neutral-content"
//   key={p.name}
// >
//   <figure className="p-2">
//     <img src="{p.sprites.front_default}" alt="{p.name}" />
//   </figure>
//   <div className="card-body items-center text-center">
//     <h2 className="card-title capitalize">{p.name}</h2>
//     <p>{p.url}</p>
//     <div className="card-actions justify-end">
//       <button
//         className="btn btn-sm btn-secondary"
//         // onClick={handleSave}
//       >
//         Remove
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="h-6 w-6"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth="2"
//             d="M6 18L18 6M6 6l12 12"
//           />
//         </svg>
//       </button>
//       <Link to={`/pokemon/${p.name}`}>
//         <button className="btn btn-sm btn-accent">
//           See more
//         </button>
//       </Link>
//     </div>
//   </div>
// </div>;
