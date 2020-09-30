import {
  GET_TEACHERS_REQUEST,
  GET_TEACHERS_SUCCESS,
  GET_TEACHERS_FAILURE,
  CREATE_TEACHER_REQUEST,
  CREATE_TEACHER_SUCCESS,
  CREATE_TEACHER_FAILURE
} from '../types/teachers';
import teachersService from '../services/teachers';
import { processHttpErrorResponse } from '../../api';
import loadingActions from './ui/loading';

function getTeachers() {
  return function (dispatch) {
    dispatch({ type: GET_TEACHERS_REQUEST });

    teachersService
      .getTeachers()
      .then(({ data }) => {
        dispatch({ type: GET_TEACHERS_SUCCESS, payload: { teachers: data.data } });
      })
      .catch((error) => {
        dispatch({ type: GET_TEACHERS_FAILURE, error });
      });
  };
}

function createTeacher({ teacher, notification }) {
  return function (dispatch) {
    dispatch({ type: CREATE_TEACHER_REQUEST });
    dispatch(loadingActions.showLoading());

    teachersService
      .createTeacher(teacher)
      .then(({ data }) => {
        dispatch(loadingActions.closeLoading());
        dispatch({ type: CREATE_TEACHER_SUCCESS, payload: { teacher: data.data } });

        notification.showSuccessNotification('Enseignant ajouté', 'Votre nouvel enseignant a bien été enregistré');
      })
      .catch((error) => {
        dispatch(loadingActions.closeLoading());
        dispatch({ type: CREATE_TEACHER_FAILURE, error });

        processHttpErrorResponse(error, notification);
      });
  };
}

export default {
  getTeachers,
  createTeacher
};
