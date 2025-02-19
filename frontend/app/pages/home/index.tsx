import {   useEffect, useMemo } from "react";
import { Outlet, useNavigate } from "react-router";
import type { LinksFunction } from "react-router";
import type { Route } from "./+types/home";
import { type Clube } from "~/utils/mockData";
import { useMapStore } from "~/stores/mapStore";
import MarkerPopup from "~/components/MarkerPopup/index.client";

import Map, { links as mapLinks } from "~/components/Map/index.client";
import AutocompleteInput, {
  links as autocompleteInputLinks,
} from "~/components/AutocompleteInput";

import styles from "./styles.css?url";
import FilterInput from "~/components/FilterInput";
import { useClubStore } from "~/stores/clubStore";

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

  const { clubs, fetchClubs, applyFilter, countries, loadingCountries, fetchCountries, filteredClubs } = useClubStore();

  useEffect(() => {
    async function fetchData() {
      if (clubs.length === 0) await fetchClubs();
      if (countries.length === 0) await fetchCountries();
    }
    fetchData();
  }, [fetchClubs, fetchCountries]);

  const handleSelection = (selection: Clube | string) => {
    if (typeof selection === "string") return;
    const { geocode } = selection;
    setCenter(geocode.lat, geocode.lng);
    navigate(`/club/${selection.id}`);
  }

  const handleCountrySelection = (value: string | null) => {
    const countryCode = value?.substring(5) ?? null;
    applyFilter(countryCode);
  }

  const markers = useMemo(() => filteredClubs.map((club) => (
      <MarkerPopup
        key={club.id}
        icon={club.icon}
        position={[club.geocode.lat, club.geocode.lng]}
        popupContent={<h3>{club.nome}</h3>}
        eventHandlers={{
          click: () => {
            setCenter(club.geocode.lat, club.geocode.lng);
            navigate(`/club/${club.id}`);
          },
        }}
      />
    )), [filteredClubs, setCenter, navigate])

  return (
    <main>
      <div className="searchInput flex-row">
        <AutocompleteInput<Clube>
          data={clubs}
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
