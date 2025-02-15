import { useNavigate, type LinksFunction } from "react-router";
import type { Clube } from "~/utils/mockData";

import styles from "./styles.css?url";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};

interface ClubInfoProps {
  club: Clube;
}

export default function ClubInfo({ club }: ClubInfoProps) {
  let navigate = useNavigate();

  return (
    <div className="club-div">
      <div className="upper-club-div">
        <h1 className="club-name">{club.nome}</h1>
        <nav className="club-nav">
          <a href="">details</a>
          <a href="">titulos</a>
          <a href="">elenco</a>
        </nav>
        <button onClick={() => navigate("/")}>close</button>
      </div>
      <div className="bottom-club-div">
        <div className="club-logo">
          <img className="club-logo-img" src={club.iconURL} alt="" />
        </div>
        <div className="club-details">
          <ul>
            <li className="club-detail">
              <p className="player-info-subtitle">
                <span className="text-dark">Tecnico: </span>{club.tecnico}
              </p>
            </li>
            <li className="club-detail">
              <p className="player-info-subtitle">
                <span className="text-dark">Ano Fundação: </span>{club.anoFundacao}
              </p>
            </li>
            <li className="club-detail">
              <p className="player-info-subtitle">
                <span className="text-dark">Estádio: </span>{club.estadio}
              </p>
            </li>
            <li className="club-detail">
              <p className="player-info-subtitle">
                <span className="text-dark">Liga: </span>{club.liga}
              </p>
            </li>
            <li className="club-detail">
              <p className="player-info-subtitle">
                <span className="text-dark">Local: </span>{club.local}
              </p>
            </li>
            <li className="club-detail">
              <p className="player-info-subtitle">
                <span className="text-dark">País: </span>{club.pais}
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
