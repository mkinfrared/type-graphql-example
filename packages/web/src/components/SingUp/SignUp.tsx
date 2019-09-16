import React from "react";
import { Field, FormikProps } from "formik";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import { FormValues } from "components/SingUp/SignUp.type";
import InputField from "components/InputField";
import css from "components/SingUp/SignUp.module.scss";

class SignUp extends React.Component<FormikProps<FormValues>> {
  render() {
    const { handleSubmit } = this.props;

    return (
      <form className={css.SignUp} onSubmit={handleSubmit}>
        <Paper className={css.paper} elevation={4}>
          <Typography variant="h4">Sign Up</Typography>
          <div className={css.inputFields}>
            <Field
              component={InputField}
              className={css.input}
              variant="outlined"
              label="Email"
              name="email"
              autoComplete="off"
              fullWidth
            />
            <Field
              component={InputField}
              className={css.input}
              variant="outlined"
              label="Username"
              name="username"
              autoComplete="off"
              fullWidth
            />
            <Field
              component={InputField}
              className={css.input}
              variant="outlined"
              label="Password"
              name="password"
              autoComplete="off"
              fullWidth
            />
            <Field
              component={InputField}
              className={css.input}
              variant="outlined"
              label="Confirm"
              name="passwordConfirm"
              autoComplete="off"
              fullWidth
            />
          </div>
          <Button type="submit">Sign Up</Button>
        </Paper>
      </form>
    );
  }
}

export default SignUp;
