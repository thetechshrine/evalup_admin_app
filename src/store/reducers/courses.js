import { GET_COURSES_SUCCESS, CREATE_COURSE_SUCCESS, GET_COURSES_REQUEST, GET_COURSES_FAILURE } from '../types/courses';

function initState() {
  return {
    courses: []
  };
}

export default function (state = initState(), action) {
  switch (action.type) {
    case GET_COURSES_REQUEST: {
      return {
        ...state,
        loading: true
      };
    }

    case GET_COURSES_SUCCESS:
      return {
        courses: action.payload.courses
      };

    case GET_COURSES_FAILURE: {
      return {
        courses: state.courses
      };
    }

    case CREATE_COURSE_SUCCESS:
      return {
        courses: [action.payload.course, ...state.courses]
      };

    default:
      return state;
  }
}
