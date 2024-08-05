import { NavLink } from "react-router-dom";
import Themes from "./Themes";
import Search from "./Search";

export default function Navbar() {
  return (
    <>
      <div className="bg-primary text-neutral-content">
        <div className="navbar container m-auto py-2">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-64 p-2 shadow text-neutral"
              >
                <li>
                  <Search />
                </li>
                <li>
                  <a>My Roster</a>
                </li>
                <li>
                  <a>Battle</a>
                </li>
                <li>
                  <a>Leaderboard</a>
                </li>
              </ul>
            </div>
            <NavLink to="/">
              <img
                className="w-[130px]"
                src="https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg"
                alt=""
              />
            </NavLink>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <li className="text-lg font-bold">
                <a>My Roster</a>
              </li>
              <li className="text-lg font-bold">
                <a>Battle</a>
              </li>
              <li className="text-lg font-bold">
                <a>Leaderboard</a>
              </li>
              <li>
                <Search />
              </li>
            </ul>
          </div>
          <div className="navbar-end gap-6">
            <Themes />
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// <nav className="w-full py-1 bg-base-100 shadow">
//   <div className="container m-auto flex justify-between  mt-0 py-6">
//     <NavLink to="/">
//       <a className="btn btn-ghost text-xl">daisyUI</a>
//     </NavLink>
//     <ul className="md:flex items-center justify-between pt-4 md:pt-0 gap-8">
//       <NavLink
//         to="/"
//         className={({ isActive }) =>
//           isActive
//             ? " text-accent text-2xl hover:text-secondary font-bold outline px-3 py-1"
//             : "font-bold text-accent text-2xl hover:text-secondary px-3 py-1"
//         }
//       >
//         <li>Home</li>
//       </NavLink>

//       <NavLink
//         to="/posts/new"
//         className={({ isActive }) =>
//           isActive
//             ? " text-accent text-2xl hover:text-secondary font-bold outline px-3 py-1"
//             : "font-bold text-accent text-2xl hover:text-secondary px-3 py-1"
//         }
//       >
//         <li>Create post</li>
//       </NavLink>
//     </ul>
//     <Themes />
//   </div>
// </nav>
