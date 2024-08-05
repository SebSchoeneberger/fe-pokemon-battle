import errorImg from "../assets/404-graphic.png";
import { NavLink } from "react-router-dom";

export default function NotFound() {
  return (
    <>
      {/* <div className="m-auto min-h-screen flex justify-center flex-wrap place-content-center bg-cyan-950"> */}
      <div className="min-h-screen grid grid-col-2 place-content-center bg-cyan-950 py-10">
        <figure className="place-self-center w-2/3">
          <img src={errorImg} alt="Page not found" />
        </figure>
        <div className="flex-row place-self-center">
          <NavLink to="/">
            <button className="font-bold text-center text-xl btn">
              Go back Home
            </button>
          </NavLink>
        </div>
      </div>
    </>
  );
}
