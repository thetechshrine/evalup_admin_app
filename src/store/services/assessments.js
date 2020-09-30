import { httpClient, getHeaders } from '../../api';

const baseUrl = '/assessments';

async function getAssessments(groupId) {
  return httpClient.get(baseUrl, { headers: getHeaders(), params: { groupId } });
}

async function createAssessment(groupId, courseId, teacherId, assessment) {
  return httpClient.post(baseUrl, assessment, { headers: getHeaders(), params: { groupId, courseId, teacherId } });
}

export default {
  getAssessments,
  createAssessment
};
