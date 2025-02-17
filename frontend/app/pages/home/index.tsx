import { Outlet, useNavigate } from "react-router";
import type { LinksFunction } from "react-router";
import type { Route } from "./+types/home";
import { clubMap, type Clube } from "~/utils/mockData";
import { useMapStore } from "~/stores/mapStore";

import Map, { links as mapLinks } from "~/components/Map/index.client";
import SearchInput, {links as searchInputLinks } from "~/components/SearchInput";

import styles from "./styles.css?url";
const clubes = Array.from(clubMap.values());

export const links: LinksFunction = () => [
  ...searchInputLinks(),
  ...mapLinks(),
  { rel: "stylesheet", href: styles },
];

export function meta({}: Route.MetaArgs) {
  return [
    { title: "home" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const navigate = useNavigate();
  const {setCenter}= useMapStore();

  function handleSelection(selection: Clube | string) {
    if (typeof selection === "string") return
    const {geocode} = selection
    setCenter(geocode.lat, geocode.lng)
    navigate("/club/" + selection.id)
  }

  return (
    <main>
      <SearchInput<Clube> data={clubes} property="nome" handleSelection={handleSelection}/>
      <Outlet />
      <Map />
    </main>
  );
}
