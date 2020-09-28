import { httpClient, getHeaders } from '../../api';

const ROUTE_BASE_URL = '/services/users';

async function getUserProfile() {
  return httpClient.get(`${ROUTE_BASE_URL}/profile`, { headers: getHeaders() });
}

export default {
  getUserProfile
};
