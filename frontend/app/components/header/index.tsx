import { Link, type LinksFunction } from "react-router";

import styles from "./styles.css?url";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

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
