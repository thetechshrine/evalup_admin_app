import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  GET_USER_PROFILE_REQUEST,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_FAILURE,
  LOGOUT
} from '../types/auth';
import authService from '../services/auth';
import usersService from '../services/users';
import { processHttpErrorResponse } from '../../api';
import storage from '../../utils/storage';

function login({ credentials, history, notification } = {}) {
  return function (dispatch) {
    dispatch({ type: LOGIN_REQUEST, payload: { credentials } });

    authService
      .login(credentials)
      .then(({ data }) => {
        const { user, token } = data.data;

        dispatch({ type: LOGIN_SUCCESS, payload: { user } });
        storage.setToken(token);

        history.push('/');
      })
      .catch((error) => {
        dispatch({ type: LOGIN_FAILURE, error });

        processHttpErrorResponse(error, notification);
      });
  };
}

function getUserProfile() {
  return function (dispatch) {
    dispatch({ type: GET_USER_PROFILE_REQUEST });

    usersService
      .getUserProfile()
      .then(({ data }) => {
        dispatch({ type: GET_USER_PROFILE_SUCCESS, payload: { user: data.data } });
      })
      .catch((error) => {
        dispatch({ type: GET_USER_PROFILE_FAILURE, error });
      });
  };
}

function logout({ history } = {}) {
  storage.deleteAll();

  history.push('/');

  return { type: LOGOUT };
}

export default {
  login,
  getUserProfile,
  logout
};
