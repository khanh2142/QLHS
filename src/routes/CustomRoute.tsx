import { RootRoute, Route } from "@tanstack/router";
import App from "../App";
import AddStudent from "../pages/AddStudent/AddStudent";
import ClassManagement from "../pages/ClassManagement/ClassManagement";
import Point from "../pages/Point/Point";
import Search from "../pages/Search/Search";
import Settings from "../pages/Settings/Settings";
import SummarySemester from "../pages/SummarySemester/SummarySemester";
import SummarySubject from "../pages/SummarySubject/SummarySubject";

export const rootRoute = new RootRoute({});

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: App,
});

const addStudentRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/add-student",
  component: AddStudent,
});

const classManagementRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/class-management",
  component: ClassManagement,
});

const search = new Route({
  getParentRoute: () => rootRoute,
  path: "/search",
  component: Search,
});

const point = new Route({
  getParentRoute: () => rootRoute,
  path: "/point",
  component: Point,
});

const summarySubject = new Route({
  getParentRoute: () => rootRoute,
  path: "/summary-subject",
  component: SummarySubject,
});

const summarySemester = new Route({
  getParentRoute: () => rootRoute,
  path: "/summary-semester",
  component: SummarySemester,
});

const settings = new Route({
  getParentRoute: () => rootRoute,
  path: "/settings",
  component: Settings,
});

export const routeTree = rootRoute.addChildren([
  indexRoute,
  addStudentRoute,
  classManagementRoute,
  search,
  point,
  summarySubject,
  summarySemester,
  settings,
]);
