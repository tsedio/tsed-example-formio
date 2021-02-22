import { Route, RouteComponentProps, RouteProps } from "react-router";
import { AuthView } from "./auth/auth.view";
import { ProtectedRoute } from "./auth/protectedRoute.component";
import { Config } from "./config";
import { FormioView } from "./formio/formio.view";
import {
  FormioErrorEvent,
  FormioSuccessEvent
} from "./formio/interfaces/FormioViewOptions";
import { HomeView } from "./home/home.view";
import { RegisterView } from "./register/register.view";
import { toastr } from "./toastr/toastr.util";

export interface RouteConfig extends RouteProps {
  guard?:
    | React.ComponentType<RouteComponentProps<any>>
    | React.ComponentType<any>;
  /**
   * options forwarded to the View (component)
   */
  options?: any;
}

export const routes: RouteConfig[] = [
  {
    path: Config.auth.dashboard.path,
    exact: true,
    guard: ProtectedRoute,
    component: HomeView
  },
  {
    path: Config.forms.path,
    guard: ProtectedRoute,
    component: FormioView,
    options: {
      onSuccess(eventObj: FormioSuccessEvent) {
        toastr.success(eventObj.title, eventObj.message);
      },
      onError(eventObj: FormioErrorEvent) {
        toastr.error(eventObj.title, eventObj.message);
      }
    }
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
