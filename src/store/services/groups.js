import { httpClient, getHeaders } from '../../api';

const ROUTE_BASE_URL = '/groups';

async function getGroups() {
  return httpClient.get(`${ROUTE_BASE_URL}`, { headers: getHeaders() });
}

async function createGroup(group) {
  return httpClient.post(`${ROUTE_BASE_URL}`, group, { headers: getHeaders() });
}

export default {
  getGroups,
  createGroup
};
