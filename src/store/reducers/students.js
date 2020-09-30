import {
  GET_STUDENTS_SUCCESS,
  CREATE_STUDENT_SUCCESS,
  GET_STUDENTS_REQUEST,
  GET_STUDENTS_FAILURE
} from '../types/students';

function initState() {
  return {
    students: []
  };
}

export default function (state = initState(), action) {
  switch (action.type) {
    case GET_STUDENTS_REQUEST: {
      return {
        ...state,
        loading: true
      };
    }

    case GET_STUDENTS_SUCCESS:
      return {
        students: action.payload.students
      };

    case GET_STUDENTS_FAILURE: {
      return {
        students: state.students
      };
    }

    case CREATE_STUDENT_SUCCESS:
      return {
        students: [action.payload.student, ...state.students]
      };

    default:
      return state;
  }
}
