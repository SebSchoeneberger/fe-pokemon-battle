import LeaderboardTable from "../components/LeadeboardTable";
import addIcon from "../assets/add.png";
import { useState, useEffect} from "react";
import axios from 'axios';
import { toast } from "react-toastify";

export default function Leaderboard() {
  const [user, setUser] = useState({
    username: "",
    country: "",
    favPokemon: "",
    avatar: '',
    score: 0,
  });
  const [users, setUsers] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [isOpen , setIsOpen] = useState(false);

const handleChange = (e) => {
  setUser((prev) => ({...prev, [e.target.name]: e.target.value}));
}

useEffect(() => {

      axios.get('http://localhost:3000/leaderboard')
      .then((res) => {
        const sortedUsers = res.data.sort((a, b) => b.score - a.score);
        setUsers(sortedUsers);
      })
      .catch(error => {
        console.error(error);
      });
},[refresh]);

const handleSubmit = (e) => {
  e.preventDefault();

  const finalUser = {
    ...user,
    country: user.country || "Unknown",
    favPokemon: user.favPokemon || "None",
    avatar: user.avatar || "https://cdn-icons-png.flaticon.com/128/1144/1144760.png",
  };

  try {
    axios.post("http://localhost:3000/leaderboard", finalUser)
    .then((res) => {
      console.log(res.data);
      setRefresh(prev => !prev);
      toast.success('Welcome to our Leaderboard!');
      setIsOpen(prev => !prev);
    })
  } catch (error) {
    console.error(error);
  }

  setUser({
    username: "",
    country: "",
    favPokemon: "",
    avatar: '',
    score: 0,
  })
};

  return (
    <>
      <div className="container m-auto min-h-screen py-10">
        <p className="text-3xl text-center text-primary font-bold mb-10">
          Leaderboard page
        </p>

        <details className="collapse bg-base-200 pb-8" {...(isOpen ? { open } : {})}>
          <summary className="collapse-title text-center text-xl font-medium inline-flex items-center">
            <div className="flex justify-center items-center gap-2">
              <span>Click here to join our Leaderboard</span>
              <img src={addIcon} alt="addIcon" className="h-5 w-5" />
            </div>
          </summary>

          <div className="collapse-content flex flex-col justify-center align-middle items-center gap-4">

         <form className="flex justify-center items-center gap-2" onSubmit={handleSubmit} id="userForm">
            <label className="input input-bordered flex items-center gap-2">
              <input
                type="text"
                name="username"
                className="grow"
                placeholder="Username"
                value={user.username}
                onChange={handleChange}
                required />
            </label>
           
            <select
              className="select select-bordered max-w-xs"
              name="country"
              value={user.country}
              onChange={handleChange}
            >
              <option disabled value="">
                Country
              </option>
              <option value="Germany">Germany</option>
              <option value="USA">USA</option>
              <option value="Ethiopia">Ethiopia</option>
              <option value="Australia">Australia</option>
              <option value="Brazil">Brazil</option>
              <option value="Canada">Canada</option>
              <option value="China">China</option>
              <option value="France">France</option>
              <option value="India">India</option>
              <option value="Italy">Italy</option>
              <option value="Japan">Japan</option>
              <option value="Kenya">Kenya</option>
              <option value="Mexico">Mexico</option>
              <option value="Netherlands">Netherlands</option>
              <option value="Nigeria">Nigeria</option>
              <option value="Russia">Russia</option>
              <option value="South Africa">South Africa</option>
              <option value="South Korea">South Korea</option>
              <option value="Spain">Spain</option>
              <option value="Sweden">Sweden</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="Vietnam">Vietnam</option>
            </select>


            <label className="input input-bordered flex items-center gap-2">
              <input
                type="text"
                name="favPokemon"
                className="grow"
                placeholder="Favorite Pokemon"
                value={user.favPokemon}
                onChange={handleChange} />
            </label>

            <label className="input input-bordered flex items-center gap-2">
              <input
                type="url"
                name="avatar"
                className="grow"
                placeholder="Avatar URL"
                value={user.avatar} 
                onChange={handleChange}/>
            </label>
         </form>
         <button className="btn btn-neutral" type="submit" form="userForm">Submit</button>
          </div>

        </details>

        <LeaderboardTable users={users} />
      </div>
    </>
  );
}
