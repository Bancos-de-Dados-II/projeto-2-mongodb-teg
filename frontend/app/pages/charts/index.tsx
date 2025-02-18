import type { LinksFunction } from "react-router";
import type { Route } from "./+types/home";

import "../../app.css";
import styles from "./styles.css?url";

import { Chart } from "~/components/chart";

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
      <h1>Charts</h1>
      <div className="chartsList">
        <Chart
          src="https://charts.mongodb.com/charts-project-0-sqqjbel/embed/charts?id=f300c7df-2623-4723-b341-0e2659fd02c8&maxDataAge=3600&theme=light&autoRefresh=true"
        />

        <Chart
          src="https://charts.mongodb.com/charts-project-0-sqqjbel/embed/charts?id=11bd5cfb-d65e-432e-8a92-8126b9f1578f&maxDataAge=3600&theme=light&autoRefresh=true"
        />

        <Chart
          src="https://charts.mongodb.com/charts-project-0-sqqjbel/embed/charts?id=dca1897e-be0b-4447-9579-5c5ff40d35c6&maxDataAge=3600&theme=light&autoRefresh=true"
        />

        <Chart
          src="https://charts.mongodb.com/charts-project-0-sqqjbel/embed/charts?id=21c4b358-89f9-40d9-91d8-5137d401cd6d&maxDataAge=3600&theme=light&autoRefresh=true"
        />
      </div>
    </main>
  );
}
