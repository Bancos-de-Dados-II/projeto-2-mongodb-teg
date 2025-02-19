import { useEffect, useRef, useState } from "react";
import {  useNavigate, type LinksFunction } from "react-router";
import {  Typography } from "@mui/material";

import { getLocationByCoordenates, querySearch } from "~/api/nomatin";
import { useMapStore } from "~/stores/mapStore";
import MarkerPopup from "~/components/MarkerPopup/index.client";
import SearchInput, {links as searchInputLinks} from "~/components/SearchInput"
import ClubForm, {links as formLinks} from "~/components/ClubForm";
import Map, {links as mapLinks} from "~/components/Map/index.client";

import styles from "./styles.css?url"
import type { ClubeInput } from "~/types";
import { insertClub } from "~/api/custom";
import { fetchAllClubs } from "~/utils/mockData";
export const links: LinksFunction = () => [
  ...searchInputLinks(),
  ...formLinks(),
  ...mapLinks(),
  { rel: "stylesheet", href: styles },
];

export default function Create() {
  const [loader, setLoader]= useState(false);
  const [position] = useState<[number, number]>([0,0]);
  const childRef = useRef<L.Marker | null>(null);
  const { setCenter, }= useMapStore();
  const navigate = useNavigate();

  async function handleClubSubmit(club: ClubeInput) {
    setLoader(true);
    let pos;

    if (!childRef.current) return;
    pos = childRef.current.getLatLng();
    club.geocode = [pos.lat, pos.lng];
    const location = await getLocationByCoordenates(pos.lat, pos.lng);
    club.pais = location?.pais || "";
    club.nomeLocalizacao = location?.nomeLocalizacao || "";
    const result = await insertClub(club);
    if (result) {
      await fetchAllClubs()
      navigate("/")
    }
    else setLoader(false);
  }

  async function onSearch(query: string) {
    setLoader(true);
    const result = await querySearch(query)
    setLoader(false);
    if (!result) return;
    if (childRef.current) {
      childRef.current.setLatLng([result[0], result[1]])
      setCenter(result[0], result[1])
    }
  }

  useEffect(() => {
    setCenter(0, 0);
  }, [])

  return (
    <div className="main-div max-width">
        <Typography variant="h5" className="form-title">Add Club</Typography>
      <hr />
      <div className="input-div">
        <ClubForm handleSubmit={handleClubSubmit} disabled={loader}/>
        <div className="select-local">
          <SearchInput handleSelection={onSearch} disable={loader}></SearchInput>
          <Map>
            <MarkerPopup
            ref={childRef}
            draggable={true}
            position={position}
            icon={{
              url: "/football-club.png",
              size: [30,30],
            }}
            >
            </MarkerPopup>
          </Map>
        </div>
      </div>
    </div>
  )
}


