import type { LinksFunction } from "react-router";

import styles from "./styles.css?url";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};

export default function ClubInfo() {
  return (
    <div className="club-div">
      <div className="upper-club-div">
        <h1 className="club-name">Real madrid</h1>
        <nav className="club-nav">
          <a href="">details</a>
          <a href="">titulos</a>
          <a href="">elenco</a>
        </nav>
        <button>editar</button>
      </div>
      <div className="bottom-club-div">
        <div className="club-logo">
          <img
            className="club-logo-img"
            src="https://cdn.soccerwiki.org/images/logos/clubs/163.png"
            alt=""
          />
        </div>
        <div className="club-details">
          <ul>
            <li className="club-detail">
              <p className="player-info-subtitle">
                <span className="text-dark">Tecnico: </span>Carlo Ancelloti
              </p>
            </li>
            <li className="club-detail">
              <p className="player-info-subtitle">
                <span className="text-dark">Ano Fundação: </span>1902
              </p>
            </li>
            <li className="club-detail">
              <p className="player-info-subtitle">
                <span className="text-dark">Estádio: </span>Santiago Bernabeu
              </p>
            </li>
            <li className="club-detail">
              <p className="player-info-subtitle">
                <span className="text-dark">Liga: </span>La Liga
              </p>
            </li>
            <li className="club-detail">
              <p className="player-info-subtitle">
                <span className="text-dark">Local: </span>Madrid
              </p>
            </li>
            <li className="club-detail">
              <p className="player-info-subtitle">
                <span className="text-dark">País: </span>Espanha
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
