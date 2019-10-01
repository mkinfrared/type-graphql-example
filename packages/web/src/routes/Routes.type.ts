import { User } from "store/reducers/user/types";

export enum RouterPaths {
  SIGN_UP = "/sign-up",
  SIGN_IN = "/sign-in"
}

export interface RoutesProps {
  user: User;
  updateUser: (user: User) => void;
}
