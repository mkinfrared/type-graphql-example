import React from "react";
import { registerValidation } from "@bookstore/common";
import { Formik } from "formik";

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

class Container extends React.Component<RegisterUserProps> {
  handleSubmit: HandleSubmit<FormValues> = async (values, formikBag) => {
    try {
      await this.props.mutate({ variables: { ...values } });
    } catch (e) {
      console.log(e.graphQLErrors);
      if (e.graphQLErrors.length) {
        const { exception } = e.graphQLErrors[0].extensions;
        formikBag.setErrors(exception);
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

export default withRegisterUser()(Container);

export { Container };
