import { RouteComponentProps } from "react-router-dom";
import { WithSnackbarProps } from "notistack";

import { User } from "store/reducers/user/types";

export interface SignInProps extends RouteComponentProps, WithSnackbarProps {
  updateUser: (user: User) => void;
}
