import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

import css from "components/PageLoader/PageLoader.module.scss";

const PageLoader = () => (
  <div className={css.PageLoader}>
    <CircularProgress color="inherit" />
  </div>
);

export default PageLoader;
