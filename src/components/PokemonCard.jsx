import { Link } from "react-router-dom";

// let storePokemon = [];
// const found = JSON.parse(localStorage.getItem("myPokemon"))?.find((p) => {
//   return storePokemon.id === p.id;
// });
// console.log(found);

export default function PokemonCard({ id, image, name, types = [] }) {
  // function handleSave(e) {
  //   e.preventDefault();

  //   const storePokemon = JSON.parse(localStorage.getItem("myPokemon")) || [];
  //   storePokemon.push({ name: name, id: id, image: image });
  //   localStorage.setItem("myPokemon", JSON.stringify(storePokemon));
  // }

  function handleSave(e) {
    e.preventDefault();

    const storePokemon = JSON.parse(localStorage.getItem("myPokemon")) || [];
    const newItem = { name: name, id: id, image: image };

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
  }

  return (
    <>
      <div className="card bg-neutral text-neutral-content">
        <figure className="p-2">
          <img src={image} alt={name} />
        </figure>

        <div className="card-body items-center text-center">
          <div className="flex flex-row gap-x-2">
            {types.map((type, index) => (
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
                {type}
              </div>
            ))}
          </div>

          <h2 className="card-title capitalize">{name}</h2>

          <div className="card-actions justify-end">
            <button className="btn btn-sm btn-secondary" onClick={handleSave}>
              Catch it
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
            <Link to={`/pokemon/${id}`}>
              <button className="btn btn-sm btn-accent">See more</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
