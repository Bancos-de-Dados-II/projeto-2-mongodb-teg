import type { LinksFunction } from "react-router";
import { Marker, MapContainer, TileLayer, Popup } from "react-leaflet";

import styles from "./styles.css?url";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export default function Map() {
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
      <Marker position={[51.505, -0.09]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
}
