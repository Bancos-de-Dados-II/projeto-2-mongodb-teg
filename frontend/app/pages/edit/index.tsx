import { useEffect, useRef, useState } from "react";
import { redirect, type LinksFunction } from "react-router";
import type { Route } from "./+types/modify";
import { Button, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

import { fetchClubById, type ClubeInput } from "~/utils/mockData";
import { querySearch } from "~/api/nomatin";
import { useMapStore } from "~/stores/mapStore";
import MarkerPopup from "~/components/MarkerPopup/index.client";
import SearchInput, {links as searchInputLinks} from "~/components/SearchInput"
import ClubForm, {links as formLinks} from "~/components/ClubForm";
import Map, {links as mapLinks} from "~/components/Map/index.client";

import styles from "./styles.css?url"
export const links: LinksFunction = () => [
  ...searchInputLinks(),
  ...formLinks(),
  ...mapLinks(),
  { rel: "stylesheet", href: styles },
];

export async function clientLoader({params}: Route.LoadreArgs) {
  const result = await fetchClubById(params.id);
  if (!result) throw redirect("/");
  return { club: result };
}

export default function Modify({loaderData}: Route.LoadreArgs) {
  const { club } = loaderData;
  const [loader, setLoader]= useState(false);
  const [position] = useState<[number, number]>([club.geocode.lat, club.geocode.lng]);
  const childRef = useRef<L.Marker | null>(null);
  const { setCenter }= useMapStore();

  async function handleClubSubmit(club: ClubeInput) {
    setLoader(true);
    // let pos;
    // if (childRef.current) {
    //   pos = childRef.current.getLatLng();
    //   club.geocode = { lat: pos.lat, lng: pos.lng };
    // }
    // setLoader(false)
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
    setCenter(club.geocode.lat, club.geocode.lng);
  }, [])

  return (
    <div className="main-div max-width">
        <Typography variant="h5" className="form-title">Update Club</Typography>
      <hr />
      <div className="input-div">
        <ClubForm handleSubmit={handleClubSubmit} disabled={loader} defaultClube={club} />
        <div className="select-local">
          <SearchInput handleSelection={onSearch} disable={loader}></SearchInput>
          <Map>
            <MarkerPopup
            ref={childRef}
            draggable={true}
            position={position}
            icon={{
              url: club.icon.url,
              size: [30,30],
            }}
            >
            </MarkerPopup>
          </Map>
          <Button variant="outlined" startIcon={<DeleteIcon />} style={{marginTop: "auto", marginLeft: "auto"}} disabled={loader}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  )
}

