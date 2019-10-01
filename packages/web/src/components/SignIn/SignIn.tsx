import React from "react";
import { Link } from "react-router-dom";
import { Field, FormikProps } from "formik";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import { FormValues, SignInState } from "components/SignIn/SignIn.type";
import InputField from "components/InputField";
import css from "components/SingUp/SignUp.module.scss";
import { RouterPaths } from "routes/Routes.type";

class SignIn extends React.Component<FormikProps<FormValues>, SignInState> {
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
          </div>
          <div className={css.link}>
            <Link to={RouterPaths.SIGN_UP}>Sign Up</Link>
          </div>
          <Button type="submit">Sign In</Button>
        </Paper>
      </form>
    );
  }
}

export default SignIn;
