import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div className="page-wrapper">
      <Header />
      <main className="page-content">
        <div className="content-container">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}
