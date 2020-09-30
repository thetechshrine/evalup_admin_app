import { GET_GROUPS_SUCCESS, CREATE_GROUP_SUCCESS, GET_GROUPS_REQUEST, GET_GROUPS_FAILURE } from '../types/groups';

function initState() {
  return {
    groups: []
  };
}

export default function (state = initState(), action) {
  switch (action.type) {
    case GET_GROUPS_REQUEST: {
      return {
        ...state,
        loading: true
      };
    }

    case GET_GROUPS_SUCCESS:
      return {
        groups: action.payload.groups
      };

    case GET_GROUPS_FAILURE: {
      return {
        groups: state.groups
      };
    }

    case CREATE_GROUP_SUCCESS:
      return {
        groups: [action.payload.group, ...state.groups]
      };

    default:
      return state;
  }
}
