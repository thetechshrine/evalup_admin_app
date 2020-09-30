import { httpClient, getHeaders } from '../../api';

const ROUTE_BASE_URL = '/students';

async function getStudents() {
  return httpClient.get(`${ROUTE_BASE_URL}`, { headers: getHeaders() });
}

async function createStudent(groupId, student) {
  return httpClient.post(`${ROUTE_BASE_URL}`, student, { headers: getHeaders(), params: { groupId } });
}

export default {
  getStudents,
  createStudent
};
