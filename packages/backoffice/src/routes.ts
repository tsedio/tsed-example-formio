import { Route } from "react-router";
import { AuthView } from "./auth/auth.view";
import { RegisterView } from "./register/register.view";

export const routes: any[] = [
  {
    path: "/auth",
    exact: true,
    guard: Route,
    component: AuthView
  },
  {
    path: "/register",
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
