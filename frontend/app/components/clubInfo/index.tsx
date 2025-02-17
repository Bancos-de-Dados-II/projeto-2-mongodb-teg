import { useEffect, useRef } from "react";
import { useNavigate, type LinksFunction } from "react-router";
import { Button } from "@mui/material";
import type { Clube } from "~/utils/mockData";

import styles from "./styles.css?url";
export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

const fallbackImg = "/football-club.png"

interface ClubInfoProps {
  club: Clube;
}

let rerenders = 0;

export default function ClubInfo({ club }: ClubInfoProps) {
  const navigate = useNavigate();
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (club.nome === "Ajax") console.log(++rerenders);
  });

  function handleImageError() {
    if (imgRef.current) {
      imgRef.current.src = fallbackImg;
    }
  }

  return (
    <div className="club-div">
    <div className="upper-club-div">
      <h1 className="club-name">{club.nome}</h1>
      <div className="button-div">
        <Button variant="contained">Edit</Button>
        <Button variant="contained" color="error" onClick={() => navigate("/")}>Close</Button>
      </div>
    </div>
    <div className="bottom-club-div">
      <div className="club-logo">
        <img ref={imgRef} className="club-logo-img" src={club.iconURL || fallbackImg} onError={handleImageError} alt={club.nome} />
      </div>
        <ClubData club={club} />
    </div>
    </div>
  );
};

function ClubData({club}: { club: Clube}) {
 const details = [
    { label: "Técnico", value: club.tecnico },
    { label: "Ano Fundação", value: club.anoFundacao },
    { label: "Estádio", value: club.estadio },
    { label: "Liga", value: club.liga },
    { label: "Local", value: club.local },
    { label: "País", value: club.pais },
  ];

  return (
    <div className="club-info">
    <div className="club-details club-section">
      <h2 className="text-dark club-section-title">Details</h2>
      <ul>
        {details.map(({ label, value }) => (
          <li className="club-detail" key={label}>
            <p className="player-info-subtitle text-green">
              <span className="text-dark">{label}: </span>
              {value}
            </p>
          </li>
        ))}
      </ul>
    </div>
    <div className="club-titles club-section">
      <h2 className="text-dark club-section-title">Títulos</h2>
      {club.titulos.length === 0 ? (
        <p>No titles conquered</p>
      ) : (
        <ul>
          {club.titulos.map(({ nome, conquistas }, ind) => (
            <li key={ind}>
              <p className="player-info-subtitle text-green">
                <span className="text-dark text-lower">{conquistas}x: </span>
                {nome}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
    </div>
  );
}
