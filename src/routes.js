import loadable from '@loadable/component';
import { v1 as uuid } from 'uuid';

import { Icons } from './components/layout/sidebar_menu/SidebarMenu';

const Layout = loadable(() => import('./components/layout/Layout'));
const Login = loadable(() => import('./components/pages/Login'));
const Home = loadable(() => import('./components/pages/Home'));
const Groups = loadable(() => import('./components/pages/Groups'));
const Courses = loadable(() => import('./components/pages/Courses'));
const Students = loadable(() => import('./components/pages/Students'));
const Teachers = loadable(() => import('./components/pages/Teachers'));
const Assessments = loadable(() => import('./components/pages/Assessments'));
const NewAssessment = loadable(() => import('./components/pages/NewAssessment'));
const AssessmentResults = loadable(() => import('./components/pages/AssessmentResults'));

export const publicRoutes = [
  { key: uuid(), path: '/login', component: Login },
  { key: uuid(), path: '/', component: Layout }
];

export const privateRoutes = [
  { key: uuid(), path: '/home', title: 'Accueil', icon: Icons.HOME, component: Home, sidebarMenu: true },
  { key: uuid(), path: '/groups', title: 'Classes', icon: Icons.GROUPS, component: Groups, sidebarMenu: true },
  { key: uuid(), path: '/courses', title: 'Cours', icon: Icons.COURSES, component: Courses, sidebarMenu: true },
  { key: uuid(), path: '/students', title: 'Etudiants', icon: Icons.STUDENTS, component: Students, sidebarMenu: true },
  {
    key: uuid(),
    path: '/teachers',
    title: 'Enseignants',
    icon: Icons.TEACHERS,
    component: Teachers,
    sidebarMenu: true
  },
  {
    key: uuid(),
    path: '/assessments',
    title: 'Evaluations',
    icon: Icons.ASSESSMENTS,
    component: Assessments,
    sidebarMenu: true,
    exactPath: true
  },
  { key: uuid(), path: '/assessments/new', component: NewAssessment },
  { key: uuid(), path: '/assessments/:assessmentId', component: AssessmentResults }
];
