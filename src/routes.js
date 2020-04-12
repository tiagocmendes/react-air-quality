/*!

=========================================================
* Material Dashboard React - v1.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Location from '@material-ui/icons/LocationOn';
import Globe from '@material-ui/icons/Public';
import Analytics from '@material-ui/icons/Timeline';
import SearchIcon from '@material-ui/icons/Search';
// core components/views for Main layout
import Typography from "views/Typography/Typography.js";

import Continents from "views/Continents/Continents.js";
import CurrentLocation from "views/CurrentLocation/CurrentLocation.js";
import Search from "views/Search/Search.js";
import CacheAnalytics from "views/CacheAnalytics/CacheAnalytics.js";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Current Location",
    icon: Location,
    component: CurrentLocation,
    layout: "/aqi"
  },
  {
    path: "/continents",
    name: "Continents",
    icon: Globe,
    component: Continents,
    layout: "/aqi"
  },
  {
    path: "/region",
    name: "Search Region",
    icon: SearchIcon,
    component: Search,
    layout: "/aqi"
  },
  {
    path: "/analytics",
    name: "Cache Analytics",
    icon: Analytics,
    component: CacheAnalytics,
    layout: "/aqi"
  }
];

export default dashboardRoutes;
