import axios from 'axios';

import storage from '../utils/storage';

const httpClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL
});
const contentTypes = Object.freeze({
  JSON: 'application/json'
});

function getHeaders(contentType = contentTypes.JSON) {
  const headers = { 'Content-Type': contentType };
  if (storage.getToken()) headers['Authorization'] = `Bearer ${storage.getToken()}`;

  return headers;
}

function processHttpErrorResponse(error, notification) {
  let errorMessage = error.message;
  if (error.response && error.response.data) errorMessage = error.response.data.message;

  console.log(error.response);

  const ERROR_NOTIFICATION_TITLE = 'An error occurred.';
  notification.showErrorNotification(ERROR_NOTIFICATION_TITLE, errorMessage);
}

export { httpClient, contentTypes, getHeaders, processHttpErrorResponse };
