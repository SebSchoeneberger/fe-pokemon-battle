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

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        {/* <Route path="/posts/:id" element={<PostDetails />} />
        <Route path="/posts/new" element={<NewPost />} />
        <Route path="/posts/edit/:id" element={<EditPost />} /> */}
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
