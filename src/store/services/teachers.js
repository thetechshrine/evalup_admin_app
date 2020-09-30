import { httpClient, getHeaders } from '../../api';

const ROUTE_BASE_URL = '/teachers';

async function getTeachers() {
  return httpClient.get(`${ROUTE_BASE_URL}`, { headers: getHeaders() });
}

async function createTeacher(teacher) {
  return httpClient.post(`${ROUTE_BASE_URL}`, teacher, { headers: getHeaders() });
}

export default {
  getTeachers,
  createTeacher
};
