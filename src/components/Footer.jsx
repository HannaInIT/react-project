import { Link } from "react-router";

export default function Footer() {
  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <footer className="footer">
      <div className="content-container footer-inner">
        {/* logo */}
        <div className="logo">
          <Link to="/">
            <h1>LOGO</h1>
          </Link>
        </div>

        {/* copyright text */}
        <div className="copyright">
          <p>© {new Date().getFullYear()} All rights reserved</p>
        </div>

        {/* back to top button */}
        <button
          type="button"
          onClick={handleBackToTop}
          aria-label="Back to top" className="back-btn"
        >
          Back to top
        </button>
      </div>
    </footer>
  );
}
