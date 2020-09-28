const TOKEN_KEY = 'evalup_students_app_token';

function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

function isAuthenticate() {
  return !!getToken();
}

function deleteAll() {
  localStorage.removeItem(TOKEN_KEY);
}

export default {
  setToken,
  getToken,
  isAuthenticate,
  deleteAll
};
