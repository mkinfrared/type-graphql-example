import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { withSnackbar } from "notistack";
import { Formik } from "formik";

import { SignInProps } from "containers/SignIn/SignIn.type";
import { FormValues } from "components/SignIn/SignIn.type";
import updateUser from "store/reducers/user/actions";
import { SignInUserProps, withSignInUser } from "type/Graphql.type";
import SignIn from "components/SignIn";
import { HandleSubmit } from "type/shared";

class Container extends React.Component<SignInUserProps & SignInProps> {
  handleSubmit: HandleSubmit<FormValues> = async (values, formikBag) => {
    const { history, mutate, updateUser } = this.props;

    try {
      const response = await mutate({ variables: { ...values } });

      if (response.data && response.data.login) {
        const { login } = response.data;
        updateUser(login);
      }

      history.push("/");
    } catch (e) {
      if (e.graphQLErrors.length) {
        const { exception } = e.graphQLErrors[0].extensions;
        formikBag.setErrors(exception);
      }
    }
  };

  render() {
    const initialValues = {
      username: "",
      password: ""
    };

    return (
      <Formik
        initialValues={initialValues}
        onSubmit={this.handleSubmit}
        component={SignIn}
      />
    );
  }
}

const mapDispatchToProps = {
  updateUser
};

export default compose<React.ComponentClass>(
  withSignInUser(),
  withRouter,
  withSnackbar,
  connect(
    null,
    mapDispatchToProps
  )
)(Container);
