import { lazy } from "react";

const routes = [
  {
    path: "/",
    name: "login",
    component: lazy(() => import("../views/Login")),
  },
  {
    path: "/home",
    name: "home",
    component: lazy(() => import("../views/Home")),
  },
  {
    path: "/greenHouses",
    name: "greenHouses",
    component: lazy(() => import("../views/GreenHouses")),
  },
  {
    path: "/farm",
    name: "farm",
    component: lazy(() => import("../views/Farm")),
  },
  {
    path: "/analysis",
    name: "analysis",
    component: lazy(() => import("../views/Analysis")),
  },
  {
    path: "/abnormal",
    name: "abnormal",
    component: lazy(() => import("../views/Abnormal")),
  },
  {
    path: "/equipment",
    name: "equipment",
    component: lazy(() => import("../views/Equipment")),
  },
  {
    path: "/greenhouseManagement",
    name: "greenhouseManagement",
    component: lazy(() => import("../views/GreenhouseManagement")),
  },
  {
    path: "/knowledge",
    name: "knowledge",
    component: lazy(() => import("../views/Knowledge")),
  },
  {
    path: "/monitor",
    name: "monitor",
    component: lazy(() => import("../views/Monitor")),
  },
  {
    path: "/search",
    name: "search",
    component: lazy(() => import("../views/Search")),
  },
  {
    path: "/task",
    name: "task",
    component: lazy(() => import("../views/Task")),
  },
  {
    path: "/addTask",
    name: "addTask",
    component: lazy(() => import("../views/AddTask")),
  },
  {
    path: "/scanCode",
    name: "scanCode",
    component: lazy(() => import("../views/ScanCode")),
  },
  {
    path: "/expert",
    name: "expert",
    component: lazy(() => import("../views/Expert")),
  },
  {
    path: "/dialog/:id",
    name: "dialog",
    component: lazy(() => import("../views/Dialog")),
  },
  {
    path: "/bindDevice",
    name: "bindDevice",
    component: lazy(() => import("../views/BindDevice")),
  },
  {
    path: "/assess",
    name: "assess",
    component: lazy(() => import("../views/Assess")),
  },
];
export default routes;
