import { Loader, oneOfIsActive } from "@project/shared";
import React from "react";
import { useSelector } from "react-redux";
import { Route, Switch } from "react-router";
import { routes } from "./routes";

function App() {
  const isActive = useSelector(oneOfIsActive("auth", "loader"));
  return (
    <div className='App'>
      <main>
        <Switch>
          {routes.map(({ guard: Cmp = Route, ...props }, index) => (
            <Cmp {...props} key={index} />
          ))}
        </Switch>
      </main>
      <Loader isActive={isActive} />
    </div>
  );
}

export default App;
