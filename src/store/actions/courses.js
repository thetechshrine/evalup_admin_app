import {
  GET_COURSES_REQUEST,
  GET_COURSES_SUCCESS,
  GET_COURSES_FAILURE,
  CREATE_COURSE_REQUEST,
  CREATE_COURSE_SUCCESS,
  CREATE_COURSE_FAILURE
} from '../types/courses';
import coursesService from '../services/courses';
import { processHttpErrorResponse } from '../../api';
import loadingActions from './ui/loading';

function getCourses(groupId) {
  return function (dispatch) {
    dispatch({ type: GET_COURSES_REQUEST });

    coursesService
      .getCourses(groupId)
      .then(({ data }) => {
        dispatch({ type: GET_COURSES_SUCCESS, payload: { courses: data.data } });
      })
      .catch((error) => {
        dispatch({ type: GET_COURSES_FAILURE, error });
      });
  };
}

function createCourse({ groupId, course, notification }) {
  return function (dispatch) {
    dispatch({ type: CREATE_COURSE_REQUEST });
    dispatch(loadingActions.showLoading());

    coursesService
      .createCourse(groupId, course)
      .then(({ data }) => {
        dispatch(loadingActions.closeLoading());
        dispatch({ type: CREATE_COURSE_SUCCESS, payload: { course: data.data } });

        notification.showSuccessNotification('Cours ajouté', 'Votre nouveau cours a bien été enregistré');
      })
      .catch((error) => {
        dispatch(loadingActions.closeLoading());
        dispatch({ type: CREATE_COURSE_FAILURE, error });

        processHttpErrorResponse(error, notification);
      });
  };
}

export default {
  getCourses,
  createCourse
};
