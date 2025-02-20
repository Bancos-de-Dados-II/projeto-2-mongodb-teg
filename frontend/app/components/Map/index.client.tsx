import {  type LinksFunction } from "react-router";
import { useMap, MapContainer, TileLayer } from "react-leaflet";

import styles from "./styles.css?url";
import { useEffect, type ReactNode } from "react";
import { useMapStore } from "~/stores/mapStore";

function MapCenterHandler() {
  const map = useMap();
  const { center } = useMapStore();

  useEffect(() => {
    if (center && center !== null) map.flyTo(center, map.getZoom() + 3);
  }, [center, map]);

  return <></>;
}

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

type Props = {
  children?: string | ReactNode | ReactNode[];
}

export default function Map({children}: Props) {
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
      {children}
    </MapContainer>
  );
}
