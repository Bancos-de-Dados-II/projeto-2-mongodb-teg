import type { LinksFunction } from "react-router";
import type { Route } from "./+types/home";

import styles from "./styles.css?url";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};

// defines metadata for this route
export function meta({}: Route.MetaArgs) {
  return [
    { title: "about" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function About() {
  return (
    <main>
      <h1>hello from the about page</h1>
    </main>
  );
}
