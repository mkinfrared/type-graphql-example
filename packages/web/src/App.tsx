import React from "react";

import Swapi from "components/Swapi";
import SignUp from "containers/SignUp";
import css from "App.module.scss";

const App: React.FC = () => {
  return (
    <div className={css.App}>
      <SignUp />
      <Swapi />
    </div>
  );
};

export default App;
