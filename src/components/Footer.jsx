import { Link } from "react-router-dom";

export default function Footer() {
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
        <button>Back to top</button>
      </div>
    </footer>
  );
}
