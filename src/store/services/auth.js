import { httpClient, getHeaders } from '../../api';
import accountEnums from '../../utils/enums/account';

const ROUTE_BASE_URL = '/services/auth';

async function login(credentials) {
  return httpClient.post(
    `${ROUTE_BASE_URL}/sign-in`,
    { ...credentials, role: accountEnums.roles.STUDENT },
    { headers: getHeaders() }
  );
}

export default {
  login
};
