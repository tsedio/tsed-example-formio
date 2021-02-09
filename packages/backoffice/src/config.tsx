const resolve = (url: string) =>
  (url || "").replace("{origin}", window.location.origin);

const formioUrl = resolve(process.env.REACT_APP_FORMIO_URL);
const apiUrl = resolve(process.env.REACT_APP_API_URL);
const appUrl = resolve(process.env.REACT_APP_URL);

export const Config = {
  projectTitle: "Project",
  formioUrl,
  apiUrl,
  appUrl,
  auth: {
    anonState: "/auth",
    authState: "/",
    login: {
      form: "user/login"
    },
    register: {
      form: "user/register"
    }
  }
};
