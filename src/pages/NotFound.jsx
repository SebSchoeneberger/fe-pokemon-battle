import errorImg from "../assets/404-pokemon.jpg";
import { NavLink } from "react-router-dom";

export default function NotFound() {
  return (
    <>
      {/* <div className="m-auto min-h-screen flex justify-center flex-wrap place-content-center bg-cyan-950"> */}
      <div className=" flex place-content-center py-10">
        <div className="card bg-base-100 w-[50%] shadow-xl">
          <figure className="px-6 pt-6">
            <img src={errorImg} alt="Page not found" />
          </figure>
          <div className="card-body items-center text-center">
            <p className="font-bold">
              Who is that pokemon? We couldn't find it.
            </p>
            <NavLink to="/">
              <button className="font-bold text-center text-lg btn mt-4">
                Go back Home
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}
