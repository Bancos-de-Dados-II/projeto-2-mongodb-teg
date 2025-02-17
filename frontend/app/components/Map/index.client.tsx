import { useNavigate, type LinksFunction } from "react-router";
import { useMap, Marker, MapContainer, TileLayer, Popup } from "react-leaflet";
import { Icon } from "leaflet";

import styles from "./styles.css?url";
import { useEffect, useState } from "react";
import { type Clube, fetchAllClubs } from "~/utils/mockData";
import { useMapStore } from "~/stores/mapStore";

function MapCenterHandler() {
  const map = useMap();
  const { center } = useMapStore();

  useEffect(() => {
    if (center) map.flyTo(center, map.getZoom());
  }, [center, map]);

  return null;
}


export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export default function Map() {
  let navigate = useNavigate();

  const [clubs, setClubs] = useState<Clube[]>([]);
  const { setCenter } = useMapStore();

  useEffect(() => {
    const fetchData = async () => {
      const clubs = await fetchAllClubs();
      clubs.map((club) => {
        club.leafletIcon = new Icon({
          iconUrl:
            club.iconURL || "/football-club.png",
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
      <MapCenterHandler />
      {clubs.map((club) => (
        <Marker
          position={[club.geocode.lat, club.geocode.lng]}
          key={club.id}
          icon={club.leafletIcon}
          eventHandlers={{
            click: () => {
              setCenter(club.geocode.lat, club.geocode.lng);
              navigate(`/club/${club.id}`);
            },
          }}
        >
          <Popup><h3>{club.nome}</h3></Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
