export default function PokemonCard({image, name, types=[]}) {
  return (
    <>
      <div className="card bg-neutral text-neutral-content">
        <figure className="p-2">
          <img
            src={image}
            alt={name}
          />
        </figure>

        <div className="card-body items-center text-center">
          <div className="flex flex-row gap-x-2">
            {types.map((type, index) => (
              <div key={index} className={`badge badge-${index % 3 === 0 ? 'primary' : index % 3 === 1 ? 'secondary' : 'accent' }`}>
                {type}
                </div>
            ))}
            
          </div>
          <h2 className="card-title">{name}</h2>
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
