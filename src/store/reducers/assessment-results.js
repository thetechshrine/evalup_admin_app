import {
  GET_ASSESSMENT_RESULTS_SUCCESS,
  GET_ASSESSMENT_RESULTS_REQUEST,
  GET_ASSESSMENT_RESULTS_FAILURE
} from '../types/assessment-results';

function initState() {
  return {
    assessmentResults: []
  };
}

export default function (state = initState(), action) {
  switch (action.type) {
    case GET_ASSESSMENT_RESULTS_REQUEST: {
      return {
        ...state,
        loading: true
      };
    }

    case GET_ASSESSMENT_RESULTS_SUCCESS:
      return {
        assessmentResults: action.payload.assessmentResults
      };

    case GET_ASSESSMENT_RESULTS_FAILURE: {
      return {
        assessmentResults: state.assessmentResults
      };
    }

    default:
      return state;
  }
}
