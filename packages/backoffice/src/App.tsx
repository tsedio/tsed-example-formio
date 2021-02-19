import { IfSidebar, Loader, oneOfIsActive } from "@project/shared";
import { useSidebar } from "@project/shared";
import { AuthState, selectRoot } from "@tsed/react-formio";
import React from "react";
import { useSelector } from "react-redux";
import { Route, Switch } from "react-router";
import { Config } from "./config";
import { IfHeader } from "./header/header.component";
import { routes } from "./routes";

function App() {
  const { headerHeight } = Config;
  const isActive = useSelector(oneOfIsActive("auth", "loader"));
  const auth = useSelector(selectRoot<AuthState>("auth"));
  const { sidebarOpen, toggleSidebar } = useSidebar();
  const size = sidebarOpen ? "64" : "14";
  const isAuth = auth.user && auth.user.data;

  return (
    <div className='App'>
      <IfHeader
        if={isAuth}
        auth={auth}
        title={"title"}
        height={headerHeight}
        // onLogout={onLogout}
        className={`left-${size}`}
      />

      <main className={`transition-all ${isAuth ? `ml-${size}` : ""}`}>
        <div className={"p-5"}>
          <Switch>
            {routes.map(({ guard: Cmp = Route, ...props }, index) => (
              <Cmp {...props} key={index} />
            ))}
          </Switch>
        </div>
      </main>

      <IfSidebar
        if={isAuth}
        height={headerHeight}
        className={`w-${size}`}
        sidebarOpen={sidebarOpen}
        onToggle={toggleSidebar}
        // items={nav.getNav("sidebar")}
        items={[]}
        auth={auth}
      />

      <Loader isActive={isActive} />
    </div>
  );
}

export default App;
