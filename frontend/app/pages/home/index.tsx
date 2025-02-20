import {   useEffect, useMemo, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import type { LinksFunction } from "react-router";
import type { Route } from "./+types/home";
import { useMapStore } from "~/stores/mapStore";
import MarkerPopup from "~/components/MarkerPopup/index.client";

import Map, { links as mapLinks } from "~/components/Map/index.client";
import AutocompleteInput, {
  links as autocompleteInputLinks,
} from "~/components/AutocompleteInput";

import styles from "./styles.css?url";
import FilterInput from "~/components/FilterInput";
import { useClubStore } from "~/stores/clubStore";
import type { Clube } from "~/types";

export const links: LinksFunction = () => [
  ...autocompleteInputLinks(),
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
  const { setCenter } = useMapStore();

  const { clubs, fetchClubs, applyFilter, countries, loadingCountries, fetchCountries, filteredClubs, filter, initiated } = useClubStore();
  const [clubsSrc, setClubsSrc] = useState(clubs);

  useEffect(() => {
    if (filter) return setClubsSrc(filteredClubs)
    setClubsSrc(clubs)
  }, [filter,clubs, filteredClubs]);

  useEffect(() => {
    async function fetchData() {
      if (clubs.length === 0) await fetchClubs();
      if (countries.length === 0) await fetchCountries();
    }
    if (!initiated) fetchData();
  }, [fetchClubs, fetchCountries]);

  function handleSelection(selection: Clube | string) {
    if (typeof selection === "string") return;
    navigate(`/club/${selection.id}`);
    setCenter([selection.geocode[0], selection.geocode[1]]);
  }

  const handleCountrySelection = (value: string | null) => {
    const countryCode = value?.substring(5) ?? null;
    applyFilter(countryCode);
  }

  const markers = useMemo(() => clubsSrc.map((club) => (
    <MarkerPopup
      key={club.id}
      icon={{url: club.imageurl || "/football-club.png", size: [30,30]}}
      position={club.geocode}
      popupContent={<h3>{club.nome}</h3>}
      draggable={false}
      eventHandlers={{
        click: () => {
          setCenter([club.geocode[0], club.geocode[1]])
          navigate(`/club/${club.id}`);
        },
      }}
    />
    )), [clubsSrc, setCenter, navigate])

  return (
    <main>
      <div className="searchInput flex-row">
        <AutocompleteInput<Clube>
          data={clubsSrc}
          property="nome"
          handleSelection={handleSelection}
        />
        <FilterInput label="Choose A Country" disabled={!loadingCountries} data={countries} onSelection={handleCountrySelection}/>
      </div>
      <Outlet />
      <Map>
        {markers}
      </Map>
    </main>
  );
}
