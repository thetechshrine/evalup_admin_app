import {
  GET_ASSESSMENTS_SUCCESS,
  CREATE_ASSESSMENT_SUCCESS,
  GET_ASSESSMENTS_REQUEST,
  GET_ASSESSMENTS_FAILURE
} from '../types/assessments';

function initState() {
  return {
    assessments: []
  };
}

export default function (state = initState(), action) {
  switch (action.type) {
    case GET_ASSESSMENTS_REQUEST: {
      return {
        ...state,
        loading: true
      };
    }

    case GET_ASSESSMENTS_SUCCESS:
      return {
        assessments: action.payload.assessments
      };

    case GET_ASSESSMENTS_FAILURE: {
      return {
        assessments: state.assessments
      };
    }

    case CREATE_ASSESSMENT_SUCCESS:
      return {
        assessments: [action.payload.assessment, ...state.assessments]
      };

    default:
      return state;
  }
}
