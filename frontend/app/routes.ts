// this file will aply the routes to the app
import type { RouteConfig } from "@react-router/dev/routes";
import { index, layout, route } from "@react-router/dev/routes";

export default [
  // the layout function will aply one common layout to the home and charts pages
  // this will serve for example, to define one header and footer shared between pages
  layout("layouts/pageLayout/index.tsx", [
    // the index function will define the / of our apllication
    index("pages/home/index.tsx"),
    route("/charts", "pages/charts/index.tsx"),
  ]),

  // the about page will not use any layout (just one example)
  route("about", "pages/about/index.tsx"),
] satisfies RouteConfig;
