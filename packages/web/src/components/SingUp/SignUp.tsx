import React from "react";
import { Field, FormikProps } from "formik";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import { SignInState } from "components/SignIn/SignIn.type";
import { FormValues } from "components/SingUp/SignUp.type";
import InputField from "components/InputField";
import css from "components/SingUp/SignUp.module.scss";
import { RouterPaths } from "routes/Routes.type";

class SignUp extends React.Component<FormikProps<FormValues>, SignInState> {
  state: SignInState = {
    showPassword: false
  };

  getAdornment = () => {
    const { showPassword } = this.state;
    return (
      <InputAdornment position="end">
        <IconButton onClick={this.toggleShowPassword}>
          {showPassword ? <Visibility /> : <VisibilityOff />}
        </IconButton>
      </InputAdornment>
    );
  };

  toggleShowPassword = () => {
    this.setState(prevState => ({
      showPassword: !prevState.showPassword
    }));
  };

  render() {
    const { showPassword } = this.state;
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
              type={showPassword ? "text" : "password"}
              InputProps={{ endAdornment: this.getAdornment() }}
              fullWidth
            />
            <Field
              component={InputField}
              className={css.input}
              variant="outlined"
              label="Confirm"
              name="passwordConfirm"
              autoComplete="off"
              type={showPassword ? "text" : "password"}
              InputProps={{ endAdornment: this.getAdornment() }}
              fullWidth
            />
          </div>
          <div className={css.link}>
            <Link to={RouterPaths.SIGN_IN}>Sign In</Link>
          </div>
          <Button type="submit">Sign Up</Button>
        </Paper>
      </form>
    );
  }
}

export default SignUp;
