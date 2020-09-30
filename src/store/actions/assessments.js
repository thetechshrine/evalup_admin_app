import {
  GET_ASSESSMENTS_REQUEST,
  GET_ASSESSMENTS_SUCCESS,
  GET_ASSESSMENTS_FAILURE,
  CREATE_ASSESSMENT_REQUEST,
  CREATE_ASSESSMENT_SUCCESS,
  CREATE_ASSESSMENT_FAILURE
} from '../types/assessments';
import assessmentsService from '../services/assessments';
import { processHttpErrorResponse } from '../../api';
import loadingActions from './ui/loading';

function getAssessments(groupId) {
  return function (dispatch) {
    dispatch({ type: GET_ASSESSMENTS_REQUEST });

    assessmentsService
      .getAssessments(groupId)
      .then(({ data }) => {
        dispatch({ type: GET_ASSESSMENTS_SUCCESS, payload: { assessments: data.data } });
      })
      .catch((error) => {
        dispatch({ type: GET_ASSESSMENTS_FAILURE, error });
      });
  };
}

function createAssessment({ groupId, courseId, teacherId, assessment, notification, history }) {
  return function (dispatch) {
    dispatch({ type: CREATE_ASSESSMENT_REQUEST });
    dispatch(loadingActions.showLoading());

    assessmentsService
      .createAssessment(groupId, courseId, teacherId, assessment)
      .then(({ data }) => {
        dispatch(loadingActions.closeLoading());
        dispatch({ type: CREATE_ASSESSMENT_SUCCESS, payload: { assessment: data.data } });

        history.push('/assessments');

        notification.showSuccessNotification('Evaluation ajoutée', 'Votre nouvelle évaluation a bien été enregistrée');
      })
      .catch((error) => {
        dispatch(loadingActions.closeLoading());
        dispatch({ type: CREATE_ASSESSMENT_FAILURE, error });

        processHttpErrorResponse(error, notification);
      });
  };
}

export default {
  getAssessments,
  createAssessment
};
