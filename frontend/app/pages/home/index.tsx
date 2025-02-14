import type { LinksFunction } from "react-router";
import type { Route } from "./+types/home";
import Map, { links as mapLinks } from "~/components/Map/index.client";
import ClubInfo, { links as clubInfoLinks } from "~/components/clubInfo";

import styles from "./styles.css?url";

export const links: LinksFunction = () => [
  ...mapLinks(),
  ...clubInfoLinks(),
  { rel: "stylesheet", href: styles },
];

// defines metadata for this route
export function meta({}: Route.MetaArgs) {
  return [
    { title: "home" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <main>
      <ClubInfo />
      <Map />
    </main>
  );
}
