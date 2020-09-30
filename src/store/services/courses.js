import { httpClient, getHeaders } from '../../api';

function getBaseUrl(groupId) {
  return `/groups/${groupId}/courses`;
}

async function getCourses(groupId) {
  return httpClient.get(`${getBaseUrl(groupId)}`, { headers: getHeaders() });
}

async function createCourse(groupId, course) {
  return httpClient.post(`${getBaseUrl(groupId)}`, course, { headers: getHeaders() });
}

export default {
  getCourses,
  createCourse
};
