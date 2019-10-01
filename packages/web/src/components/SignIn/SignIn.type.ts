import { SignInUserMutationVariables } from "type/Graphql.type";

export interface SignInProps {}

export interface SignInState {
  showPassword: boolean;
}

export interface FormValues extends SignInUserMutationVariables {}
