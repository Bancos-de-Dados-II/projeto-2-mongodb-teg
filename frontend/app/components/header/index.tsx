import { Link, type LinksFunction } from "react-router";

import styles from "./styles.css?url";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export default function Header() {
  return (
    <header>
      <div className="footballLogo">
        <img src="/football-logo.svg"/>
      </div>
      
      <nav>
        <Link to="/" className="navLink">Home page</Link>
        <Link to="/charts" className="navLink">Charts page</Link>
        <Link to="/create" className="navLink">Add club</Link>
      </nav>
    </header>
  );
}
