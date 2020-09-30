import {
  GET_STUDENTS_REQUEST,
  GET_STUDENTS_SUCCESS,
  GET_STUDENTS_FAILURE,
  CREATE_STUDENT_REQUEST,
  CREATE_STUDENT_SUCCESS,
  CREATE_STUDENT_FAILURE
} from '../types/students';
import studentsService from '../services/students';
import { processHttpErrorResponse } from '../../api';
import loadingActions from './ui/loading';

function getStudents() {
  return function (dispatch) {
    dispatch({ type: GET_STUDENTS_REQUEST });

    studentsService
      .getStudents()
      .then(({ data }) => {
        dispatch({ type: GET_STUDENTS_SUCCESS, payload: { students: data.data } });
      })
      .catch((error) => {
        dispatch({ type: GET_STUDENTS_FAILURE, error });
      });
  };
}

function createStudent({ groupId, student, notification }) {
  return function (dispatch) {
    dispatch({ type: CREATE_STUDENT_REQUEST });
    dispatch(loadingActions.showLoading());

    studentsService
      .createStudent(groupId, student)
      .then(({ data }) => {
        dispatch(loadingActions.closeLoading());
        dispatch({ type: CREATE_STUDENT_SUCCESS, payload: { student: data.data } });

        notification.showSuccessNotification('Etudiant ajouté', 'Votre nouvel étudiant a bien été enregistré');
      })
      .catch((error) => {
        dispatch(loadingActions.closeLoading());
        dispatch({ type: CREATE_STUDENT_FAILURE, error });

        processHttpErrorResponse(error, notification);
      });
  };
}

export default {
  getStudents,
  createStudent
};
