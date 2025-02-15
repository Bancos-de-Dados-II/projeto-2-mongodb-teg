import { Outlet } from "react-router";
import type { LinksFunction } from "react-router";
import type { Route } from "./+types/home";
import Map, { links as mapLinks } from "~/components/Map/index.client";

import styles from "./styles.css?url";

export const links: LinksFunction = () => [
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
  return (
    <main>
      <Outlet />
      <Map />
    </main>
  );
}
