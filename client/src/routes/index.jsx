import MainLayout from '@layouts/MainLayout';

import Home from '@pages/Home';
import Login from '@pages/Login';
import NotFound from '@pages/NotFound';
import Register from '@pages/Register';
import UserList from '@pages/UserList';
import Forbidden from '@pages/Forbidden';

const routes = [
  {
    path: '/',
    name: 'Home',
    protected: false,
    component: Home,
    layout: MainLayout,
  },
  {
    path: '/login',
    name: 'Login',
    protected: false,
    component: Login,
  },
  {
    path: '/register/:role',
    name: 'Register',
    protected: false,
    component: Register,
  },
  {
    path: '/user',
    name: 'User',
    subRoutes: [
      {
        path: '/list',
        name: 'User List',
        protected: true,
        component: UserList,
        layout: MainLayout,
        isAdmin: true,
      },
    ],
  },
  {
    path: '/forbidden',
    name: 'Forbidden',
    protected: false,
    component: Forbidden,
    layout: MainLayout,
  },
  { path: '*', name: 'Not Found', component: NotFound, layout: MainLayout, protected: false },
];

export default routes;
