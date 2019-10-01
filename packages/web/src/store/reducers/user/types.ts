import { User as UserResult } from "type/Graphql.type";

export interface User extends UserResult {}

export enum UserActionTypes {
  UPDATE_USER = "@@user/UPDATE_USER"
}
