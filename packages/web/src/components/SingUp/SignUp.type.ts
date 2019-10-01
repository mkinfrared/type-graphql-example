import { RegisterUserMutationVariables } from "type/Graphql.type";

export interface SignUpProps {}

export interface SignUpState {
  showPassword: boolean;
}

export interface FormValues extends RegisterUserMutationVariables {}
