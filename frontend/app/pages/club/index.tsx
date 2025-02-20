import type { Route } from "./+types";
import { redirect, type LinksFunction } from "react-router";
import ClubInfo, { links as clubInfoLinks } from "~/components/clubInfo";

import styles from "./styles.css?url";
import { useClubStore } from "~/stores/clubStore";

export const links: LinksFunction = () => [
  ...clubInfoLinks(),
  { rel: "stylesheet", href: styles },
];

// this will run before the component is rendered and will redirect if the club is not found
export async function clientLoader({ params }: Route.ComponentProps) {
  const { getState } = useClubStore
  const club = getState().getClubById(params.id)
  console.log(club?.imageurl)
  const { id } = params;
  if (!id || !club) throw redirect("/");

  return club;
}

export default function Club({ loaderData }: Route.ComponentProps) {
  // const { setCenter } = useMapStore();

  // useEffect(() => {
  //   setCenter(loaderData.geocode[0], loaderData.geocode[1]);
  // }, []);

  return <ClubInfo club={loaderData} />;
}
