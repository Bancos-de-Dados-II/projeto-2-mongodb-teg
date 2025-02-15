import { clubMap } from "~/utils/mockData";
import type { Route } from "./+types";
import { redirect, type LinksFunction } from "react-router";
import { useMapStore } from "~/stores/mapStore";
import { useEffect } from "react";
import ClubInfo, { links as clubInfoLinks } from "~/components/clubInfo";

import styles from "./styles.css?url";

export const links: LinksFunction = () => [
  ...clubInfoLinks(),
  { rel: "stylesheet", href: styles },
];

// this will run before the component is rendered and will redirect if the club is not found
export async function clientLoader({ params }: Route.ComponentProps) {
  const { id } = params;
  const club = clubMap.get(id);
  if (!id || !club) throw redirect("/");

  return club;
}

export default function Club({ loaderData }: Route.ComponentProps) {
  const { setCenter } = useMapStore();

  useEffect(() => {
    setCenter(loaderData.geocode.lat, loaderData.geocode.lng);
  }, []);

  return <ClubInfo club={loaderData} />;
}
