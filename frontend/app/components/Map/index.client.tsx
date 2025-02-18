import { useNavigate, type LinksFunction } from "react-router";
import { useMap, Marker, MapContainer, TileLayer, Popup } from "react-leaflet";
import { Icon } from "leaflet";

import styles from "./styles.css?url";
import { useEffect, useState, type ReactNode } from "react";
import { type Clube, fetchAllClubs } from "~/utils/mockData";
import { useMapStore } from "~/stores/mapStore";
import { useStore } from "zustand";
import { useClubStore } from "~/stores/clubStore";

function MapCenterHandler() {
  const map = useMap();
  const { center } = useMapStore();

  useEffect(() => {
    if (center) map.flyTo(center, map.getZoom());
  }, [center, map]);

  return null;
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
