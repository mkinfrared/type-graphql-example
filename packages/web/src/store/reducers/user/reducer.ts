import { Reducer } from "redux";

import { User, UserActionTypes } from "store/reducers/user/types";

const initialState: User = {
  id: "",
  email: "",
  username: ""
};

const reducer: Reducer<User> = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case UserActionTypes.UPDATE_USER:
      return { ...state, ...payload };
    default:
      return state;
  }
};

export default reducer;
