import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { Redirect, Route, Switch } from "react-router-dom";

import PageLoader from "components/PageLoader";
import { RouterPaths, RoutesProps } from "routes/Routes.type";
import updateUser from "store/reducers/user/actions";
import { AppState } from "store/store.type";
import { useCurrentUserLazyQuery } from "type/Graphql.type";

const SignUp = React.lazy(() => import("containers/SignUp"));
const SignIn = React.lazy(() => import("containers/SignIn"));

const Routes: React.FC<RoutesProps> = props => {
  const [getCurrentUser, { data }] = useCurrentUserLazyQuery();
  const history = useHistory();

  useEffect(() => getCurrentUser(), []);

  useEffect(() => {
    if (data && data.currentUser) {
      props.updateUser(data.currentUser);
      history.push("/");
    }
  }, [data]);

  useEffect(() => {}, [props.user]);

  const unauthorized = () => (
    <>
      <React.Suspense fallback={<PageLoader />}>
        <Switch>
          <Route exact path={RouterPaths.SIGN_UP} component={SignUp} />
          <Route exact path={RouterPaths.SIGN_IN} component={SignIn} />
          <Redirect to={RouterPaths.SIGN_IN} />
        </Switch>
      </React.Suspense>
    </>
  );

  const authorized = () => (
    <>
      <React.Suspense fallback={<PageLoader />}>
        <Switch>
          <Route exact path="/" render={renderProp => <div>HOME</div>} />
          <Redirect to="/not-found" />
        </Switch>
      </React.Suspense>
    </>
  );

  if (props.user.id) {
    return authorized();
  }

  return unauthorized();
};

const mapStateToProps = ({ user }: AppState) => ({
  user
});

const mapDispatchToProps = {
  updateUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Routes);
