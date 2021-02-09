import "@project/shared";
import { Formio, initAuth, Templates } from "@tsed/react-formio";
import tailwind from "@tsed/tailwind-formio";
import { ConnectedRouter } from "connected-react-router";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
// import ReduxToastr from "react-redux-toastr";
import App from "./App";
import { Config } from "./config";
import reportWebVitals from "./reportWebVitals";
import configureStore, { history } from "./store";

// Formio configuration
Formio.setProjectUrl(Config.formioUrl);
Formio.setBaseUrl(Config.apiUrl);
Formio.use(tailwind);
Templates.framework = "tailwind";

const store = configureStore({});

store.dispatch(initAuth() as any);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
      {/*<ReduxToastr*/}
      {/*  timeOut={4000}*/}
      {/*  newestOnTop={false}*/}
      {/*  preventDuplicates*/}
      {/*  position='bottom-right'*/}
      {/*  // getState={(state: any) => state.toastr} // This is the default*/}
      {/*  transitionIn='fadeIn'*/}
      {/*  transitionOut='fadeOut'*/}
      {/*  progressBar*/}
      {/*  closeOnToastrClick*/}
      {/*/>*/}
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
