import { LOGIN_SUCCESS, GET_USER_PROFILE_SUCCESS, LOGOUT } from '../types/auth';

function initState() {
  return {
    user: null
  };
}

export default function (state = initState(), action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        user: action.payload.user
      };

    case GET_USER_PROFILE_SUCCESS:
      return {
        user: action.payload.user
      };

    case LOGOUT:
      return initState();

    default:
      return state;
  }
}
