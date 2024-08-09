import heroCover from "../assets/pokemon-hero.jpeg";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <>
      <div
        className="hero min-h-[50vh]"
        style={{
          backgroundImage:
            "url(https://th.bing.com/th/id/R.dd525ef8ec4debb16d9341db3be66286?rik=u%2fE6P743RoxBIQ&riu=http%3a%2f%2fgetwallpapers.com%2fwallpaper%2ffull%2f7%2f5%2f7%2f596539.jpg&ehk=yYVrkHopg3PUEDipDdAy%2bqxRGXJdJq7qkqpmVfzvixI%3d&risl=&pid=ImgRaw&r=0)",
        }}
      >
        <div className="hero-overlay bg-opacity-80 "></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-lg">
            <h1 className="mb-5 text-5xl font-bold">
              Are you ready to catch them all?
            </h1>
            <p className="text-lg">
              Here you will find the best pokemon trainers
            </p>
            <Link to="/leaderboard">
              <button className="btn btn-primary mt-4">See the list </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
