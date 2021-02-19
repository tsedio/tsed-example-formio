const resolve = (url: string) =>
  (url || "").replace("{origin}", window.location.origin);

const formioUrl = resolve(process.env.REACT_APP_FORMIO_URL);
const apiUrl = resolve(process.env.REACT_APP_API_URL);
const appUrl = resolve(process.env.REACT_APP_URL);

export const Config = {
  projectTitle: "Project",
  headerHeight: "64px",
  formioUrl,
  apiUrl,
  appUrl,
  auth: {
    dashboard: {
      path: "/"
    },
    login: {
      path: "/auth",
      form: "user/login"
    },
    register: {
      path: "/register",
      form: "user/register"
    }
  }
};
