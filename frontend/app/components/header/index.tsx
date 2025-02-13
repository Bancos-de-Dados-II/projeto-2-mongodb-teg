import { Link } from "react-router";

import "./styles.css";

export default function Header() {
  return (
    <header>
      <nav>
        <Link to="/">Home page</Link>
        <Link to="/charts">Charts page</Link>
        <Link to="/about">About page</Link>
      </nav>
    </header>
  );
}
