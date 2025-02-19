import { useEffect, useRef, useState } from "react";
import { redirect, useNavigate, type LinksFunction } from "react-router";
import type { Route } from "./+types/modify";
import { Button, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

import { querySearch } from "~/api/nomatin";
import { useMapStore } from "~/stores/mapStore";
import MarkerPopup from "~/components/MarkerPopup/index.client";
import SearchInput, {links as searchInputLinks} from "~/components/SearchInput"
import ClubForm, {links as formLinks} from "~/components/ClubForm";
import Map, {links as mapLinks} from "~/components/Map/index.client";

import styles from "./styles.css?url"
import type { ClubeInput } from "~/types";
import { deleteClubById, getClubById } from "~/api/custom";
import { useClubStore } from "~/stores/clubStore";
export const links: LinksFunction = () => [
  ...searchInputLinks(),
  ...formLinks(),
  ...mapLinks(),
  { rel: "stylesheet", href: styles },
];

export async function clientLoader({params}: Route.LoaderArgs) {
  const result = await getClubById(params.id);
  if (!result) throw redirect("/");
  return { club: result };
}

export default function Edit({loaderData}: Route.LoaderArgs) {
  const { club } = loaderData;
  const [loader, setLoader]= useState(false);
  const [position] = useState<[number, number]>([club.geocode[0], club.geocode[1]]);
  const childRef = useRef<L.Marker | null>(null);
  const { setCenter }= useMapStore();
  const navigate = useNavigate();
  const {fetchClubs}= useClubStore();

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

  async function deleteClub() {
    setLoader(true);
    const resp = await deleteClubById(club.id)
    if (resp) await fetchClubs();
    navigate("/")
  }

  useEffect(() => {
    setCenter(club.geocode[0], club.geocode[1]);
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
              url: club.imageurl || "/football-image.png", 
              size: [30,30],
            }}
            >
            </MarkerPopup>
          </Map>
          <Button variant="outlined" startIcon={<DeleteIcon />} style={{marginTop: "auto", marginLeft: "auto"}} disabled={loader} onClick={deleteClub}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  )
}

