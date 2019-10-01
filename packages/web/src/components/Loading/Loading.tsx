import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

import css from "components/Loading/Loading.module.scss";

class Loading extends React.Component<{}> {
  ref = React.createRef<HTMLDivElement>();

  componentDidMount() {
    const windowHeight = document.documentElement.clientHeight;
    const parentHeight = this.ref.current!.parentElement!.clientHeight;

    this.ref.current!.style.height =
      windowHeight < parentHeight ? `${windowHeight}px` : `${parentHeight}px`;
  }

  render() {
    return (
      <>
        <div className={css.Loading} ref={this.ref}>
          <CircularProgress />
        </div>
      </>
    );
  }
}

export default Loading;
