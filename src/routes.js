import loadable from '@loadable/component';
import { v1 as uuid } from 'uuid';

import { Icons } from './components/layout/sidebar_menu/SidebarMenu';

const Layout = loadable(() => import('./components/layout/Layout'));
const Login = loadable(() => import('./components/pages/Login'));
const AccountValidation = loadable(() => import('./components/pages/AccountValidation'));
const Home = loadable(() => import('./components/pages/Home'));

export const publicRoutes = [
  { key: uuid(), path: '/login', component: Login },
  { key: uuid(), path: '/account-validation', component: AccountValidation },
  { key: uuid(), path: '/', component: Layout }
];

export const privateRoutes = [{ key: uuid(), path: '/home', title: 'Accueil', icon: Icons.HOME, component: Home }];
