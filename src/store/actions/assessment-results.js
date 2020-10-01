import {
  GET_ASSESSMENT_RESULTS_REQUEST,
  GET_ASSESSMENT_RESULTS_SUCCESS,
  GET_ASSESSMENT_RESULTS_FAILURE
} from '../types/assessment-results';
import assessmentResultsService from '../services/assessment-results';

function getAssessmentResults(assessmentId) {
  return function (dispatch) {
    dispatch({ type: GET_ASSESSMENT_RESULTS_REQUEST });

    assessmentResultsService
      .getAssessmentResults(assessmentId)
      .then(({ data }) => {
        dispatch({ type: GET_ASSESSMENT_RESULTS_SUCCESS, payload: { assessmentResults: data.data } });
      })
      .catch((error) => {
        dispatch({ type: GET_ASSESSMENT_RESULTS_FAILURE, error });
      });
  };
}

export default {
  getAssessmentResults
};
