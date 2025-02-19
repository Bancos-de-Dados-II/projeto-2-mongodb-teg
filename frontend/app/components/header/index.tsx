import { Link, useNavigate, type LinksFunction } from "react-router";

import styles from "./styles.css?url";
import { useMapStore } from "~/stores/mapStore";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export default function Header() {
  const {setCenter} = useMapStore();
  return (
    <header>
      <nav>
        <Link to="/" className="navLink" onClick={() => setCenter(null)}>Home page</Link>
        <Link to="/charts" className="navLink">Charts page</Link>
        <Link to="/create" className="navLink">Add club</Link>
      </nav>
    </header>
  );
}
