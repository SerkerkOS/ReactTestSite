import { Outlet } from "react-router-dom";
import Header from "../components/Header.jsx";
import Sidebar from "../components/Sidebar.jsx";
import Footer from "../components/Footer.jsx";

export default function MainLayout() {
  return (
    <div className="app-shell">
      <Header />
      <div className="content-row">
        <Sidebar />
        <main className="page-content">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}
