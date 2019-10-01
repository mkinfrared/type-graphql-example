import React from "react";
import { registerValidation } from "@bookstore/common";
import { Formik } from "formik";
import { WithSnackbarProps, withSnackbar } from "notistack";

import SignUp from "components/SingUp";
import { FormValues } from "components/SingUp/SignUp.type";
import { RegisterUserProps, withRegisterUser } from "type/Graphql.type";
import { HandleSubmit } from "type/shared";

// const Container = () => {
//   const [register, { data }] = useRegisterUserMutation();
//
//   const submit = async (values: RegisterUserMutationVariables) => {
//     await register({ variables: { ...values } });
//   };
//
//   if (data) {
//     console.log(data);
//   }
//
//   const initialValues = {
//     email: "",
//     username: "",
//     password: "",
//     passwordConfirm: ""
//   };
//
//   const handleSubmit: HandleSubmit<FormValues> = async (values, formikBag) => {
//     try {
//       console.log("FROM HANDLE SUBMIT");
//       await submit(values);
//     } catch (e) {
//       const { exception } = e.graphQLErrors[0].extensions;
//
//       formikBag.setErrors(exception);
//     }
//   };
//
//   return (
//     <Formik
//       validateOnBlur
//       validateOnChange
//       initialValues={initialValues}
//       onSubmit={handleSubmit}
//       validationSchema={registerValidation}
//       render={props => <SignUp {...props} />}
//     />
//   );
// };

class Container extends React.Component<RegisterUserProps & WithSnackbarProps> {
  handleSubmit: HandleSubmit<FormValues> = async (values, formikBag) => {
    const { enqueueSnackbar, mutate } = this.props;
    try {
      await mutate({ variables: { ...values } });
      enqueueSnackbar("You can now log in to website", { variant: "success" });
    } catch (e) {
      if (e.graphQLErrors.length) {
        const { exception } = e.graphQLErrors[0].extensions;
        formikBag.setErrors(exception);
      } else {
        enqueueSnackbar("No connection with server", { variant: "error" });
      }
    }
  };

  render() {
    const initialValues = {
      email: "",
      username: "",
      password: "",
      passwordConfirm: ""
    };

    return (
      <Formik
        validateOnBlur
        validateOnChange
        initialValues={initialValues}
        onSubmit={this.handleSubmit}
        validationSchema={registerValidation}
        render={props => <SignUp {...props} />}
      />
    );
  }
}

export default withRegisterUser()(withSnackbar(Container));

export { Container };
