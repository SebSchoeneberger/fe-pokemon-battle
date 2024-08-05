export default function PokemonCard(p) {
  return (
    <>
      <div className="card bg-neutral text-neutral-content">
        <figure className="p-2">
          <img
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png"
            alt="pokemon name"
          />
        </figure>

        <div className="card-body items-center text-center">
          <div className="flex flex-row gap-x-2">
            <div className="badge badge-primary">ability 1</div>
            <div className="badge badge-secondary">ability 2</div>
            <div className="badge badge-accent">ability 3</div>
          </div>
          <h2 className="card-title">Pokemon name</h2>
          <p>We are using cookies for no reason.</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Accept</button>
            <button className="btn btn-ghost">Deny</button>
          </div>
        </div>
      </div>
    </>
  );
}
