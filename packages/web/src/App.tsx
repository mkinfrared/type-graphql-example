import React from "react";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";

import Routes from "routes";
import css from "App.module.scss";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <SnackbarProvider maxSnack={3}>
        <div className={css.App}>
          <Routes />
        </div>
      </SnackbarProvider>
    </BrowserRouter>
  );
};

export default App;
