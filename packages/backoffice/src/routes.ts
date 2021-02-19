import { Route } from "react-router";
import { AuthView } from "./auth/auth.view";
import { Config } from "./config";
import { HomeView } from "./home/home.view";
import { RegisterView } from "./register/register.view";

export const routes: any[] = [
  {
    path: Config.auth.dashboard.path,
    exact: true,
    guard: Route,
    component: HomeView
  },
  {
    path: Config.auth.login.path,
    exact: true,
    guard: Route,
    component: AuthView
  },
  {
    path: Config.auth.register.path,
    exact: true,
    guard: Route,
    component: RegisterView
  },
  {
    path: "*",
    guard: Route,
    component: AuthView
  }
];

console.log(routes);
