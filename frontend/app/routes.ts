// this file will aply the routes to the app
import type { RouteConfig } from "@react-router/dev/routes";
import {  layout, route } from "@react-router/dev/routes";

export default [
  // the layout function will aply one common layout to the home and charts pages
  // this will serve for example, to define one header and footer shared between pages
  layout("layouts/pageLayout/index.tsx", [
    // the home page will have a nested route for the club page
    route("/", "pages/home/index.tsx", [

      // the /club page will not have a page, trwing a 404 error
      // but the /club/:id will have a page, and will be nested inside the home page
      route("/club/:id",  "pages/club/index.tsx"),
    ]),
    // index("pages/home/index.tsx"),
    route("/charts", "pages/charts/index.tsx"),
    route("/edit/:id", "pages/edit/index.tsx"),
  ]),

  // the about page will not use any layout (just one example)
  route("about", "pages/about/index.tsx"),
] satisfies RouteConfig;
