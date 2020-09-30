import {
  GET_TEACHERS_SUCCESS,
  CREATE_TEACHER_SUCCESS,
  GET_TEACHERS_REQUEST,
  GET_TEACHERS_FAILURE
} from '../types/teachers';

function initState() {
  return {
    teachers: []
  };
}

export default function (state = initState(), action) {
  switch (action.type) {
    case GET_TEACHERS_REQUEST: {
      return {
        ...state,
        loading: true
      };
    }

    case GET_TEACHERS_SUCCESS:
      return {
        teachers: action.payload.teachers
      };

    case GET_TEACHERS_FAILURE: {
      return {
        teachers: state.teachers
      };
    }

    case CREATE_TEACHER_SUCCESS:
      return {
        teachers: [action.payload.teacher, ...state.teachers]
      };

    default:
      return state;
  }
}
