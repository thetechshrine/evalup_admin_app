import { httpClient, getHeaders } from '../../api';

const baseUrl = '/assessment-results';

async function getAssessmentResults(assessmentId) {
  return httpClient.get(baseUrl, { headers: getHeaders(), params: { assessmentId } });
}

export default {
  getAssessmentResults
};
