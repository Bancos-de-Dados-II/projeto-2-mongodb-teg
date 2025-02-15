import type { LinksFunction } from "react-router";
import { Marker, MapContainer, TileLayer, Popup } from "react-leaflet";

import styles from "./styles.css?url";
import { useEffect, useState } from "react";
import { type Clube, fetchAllClubs } from "~/utils/mockData";
import { Icon } from "leaflet";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export default function Map() {
  const [clubs, setClubs] = useState<Clube[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const clubs = await fetchAllClubs();
      clubs.map((club) => {
        club.leafletIcon = new Icon({
          iconUrl: club.iconURL || "https://cdn.soccerwiki.org/images/logos/clubs/163.png",
          iconSize: [30, 30],
        });
        return club;
      });
      setClubs(clubs);
    };

    fetchData();

    return () => {
      console.log("cleanup");
    };
  }, []);

  return (
    <MapContainer
      center={[-20, -50]}
      zoom={3}
      minZoom={2}
      maxZoom={18}
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {clubs.map((club) => (
        <Marker
          position={[club.geocode.lat, club.geocode.lng]}
          key={club.id}
          icon={club.leafletIcon}
        >
          <Popup>
            <h3>{club.nome}</h3>
            <p>{club.tecnico}</p>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
