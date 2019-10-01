import { action } from "typesafe-actions";

import { User, UserActionTypes } from "store/reducers/user/types";

const updateUser = (user: User) => action(UserActionTypes.UPDATE_USER, user);

export default updateUser;
