import {
  GET_GROUPS_REQUEST,
  GET_GROUPS_SUCCESS,
  GET_GROUPS_FAILURE,
  CREATE_GROUP_REQUEST,
  CREATE_GROUP_SUCCESS,
  CREATE_GROUP_FAILURE
} from '../types/groups';
import groupsService from '../services/groups';
import { processHttpErrorResponse } from '../../api';
import loadingActions from './ui/loading';

function getGroups() {
  return function (dispatch) {
    dispatch({ type: GET_GROUPS_REQUEST });

    groupsService
      .getGroups()
      .then(({ data }) => {
        dispatch({ type: GET_GROUPS_SUCCESS, payload: { groups: data.data } });
      })
      .catch((error) => {
        dispatch({ type: GET_GROUPS_FAILURE, error });
      });
  };
}

function createGroup({ group, notification }) {
  return function (dispatch) {
    dispatch({ type: CREATE_GROUP_REQUEST });
    dispatch(loadingActions.showLoading());

    groupsService
      .createGroup(group)
      .then(({ data }) => {
        dispatch(loadingActions.closeLoading());
        dispatch({ type: CREATE_GROUP_SUCCESS, payload: { group: data.data } });

        notification.showSuccessNotification('Classe ajoutée', 'Votre nouvelle classe a bien été enregistrée');
      })
      .catch((error) => {
        dispatch(loadingActions.closeLoading());
        dispatch({ type: CREATE_GROUP_FAILURE, error });

        processHttpErrorResponse(error, notification);
      });
  };
}

export default {
  getGroups,
  createGroup
};
