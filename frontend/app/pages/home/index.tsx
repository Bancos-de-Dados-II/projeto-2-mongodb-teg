import type { LinksFunction } from "react-router";
import type { Route } from "./+types/home";
import { lazy, Suspense } from "react";

import styles from "./styles.css?url";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};

// defines metadata for this route
export function meta({}: Route.MetaArgs) {
  return [
    { title: "home" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

const Map = lazy(() => import("~/components/Map"));

export default function Home() {
  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="club-form-placeholder">
          <h1>club form placeholder</h1>
        </div>
        <Map />
      </Suspense>
    </main>
  );
}
