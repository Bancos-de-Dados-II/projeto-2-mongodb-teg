import { Outlet, type LinksFunction } from "react-router";
import Header from "~/components/header";

import styles from "./styles.css?url";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};

// This layout component renders the Header component at the top and uses <Outlet /> to render the matched child route component.
export default function PageLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
