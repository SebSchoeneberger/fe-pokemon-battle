import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "./layout/MainLayout";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import PokemonDetail from "./pages/PokemonDetail";
import Roster from "./pages/Roster";
import Leaderboard from "./pages/Leaderboard";
import Battle from "./pages/Battle";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/pokemon/:id" element={<PokemonDetail />} />
        <Route path="/roster" element={<Roster />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/battle" element={<Battle />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
