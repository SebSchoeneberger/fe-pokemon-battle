import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Toast from "../components/Toast";

export default function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
      <Toast />
    </>
  );
}
