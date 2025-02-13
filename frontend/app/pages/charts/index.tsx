import type { LinksFunction } from "react-router";
import type { Route } from "./+types/home";

import styles from "./styles.css?url";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};

// defines metadata for this route
export function meta({}: Route.MetaArgs) {
  return [
    { title: "charts" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Charts() {
  return (
    <main>
      <h1>hello from the charts page</h1>
    </main>
  );
}
