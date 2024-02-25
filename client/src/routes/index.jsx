import MainLayout from '@layouts/MainLayout';

import Home from '@pages/Home';
import Login from '@pages/Login';
import NotFound from '@pages/NotFound';
import Register from '@pages/Register';
import UserList from '@pages/UserList';
import Forbidden from '@pages/Forbidden';
import UserDetail from '@pages/UserDetail';
import HouseList from '@pages/HouseList';
import HouseDetail from '@pages/HouseDetail';
import HouseForm from '@pages/HouseForm';
import FavoriteList from '@pages/FavoriteList';
import ConversationList from '@pages/ConversationList';

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
        adminOnly: true,
      },
      {
        path: '/detail/:id',
        name: 'User Detail',
        protected: false,
        component: UserDetail,
        layout: MainLayout,
      },
    ],
  },
  {
    path: '/house',
    name: 'House',
    subRoutes: [
      {
        path: '/list',
        name: 'House List',
        protected: false,
        component: HouseList,
        layout: MainLayout,
      },
      {
        path: '/detail/:id',
        name: 'House Detail',
        protected: false,
        component: HouseDetail,
        layout: MainLayout,
      },
      {
        path: '/create',
        name: 'Create House',
        protected: true,
        component: HouseForm,
        layout: MainLayout,
        sellerOnly: true,
      },
      {
        path: '/update/:id',
        name: 'Update House',
        protected: true,
        component: HouseForm,
        layout: MainLayout,
        sellerOnly: true,
      },
    ],
  },
  {
    path: '/favorite',
    name: 'Favorite',
    subRoutes: [
      {
        path: '/list',
        name: 'Favorite List',
        protected: true,
        component: FavoriteList,
        layout: MainLayout,
      },
    ],
  },
  {
    path: '/conversation',
    name: 'Conversation',
    subRoutes: [
      {
        path: '/list',
        name: 'Conversation List',
        protected: true,
        component: ConversationList,
        layout: MainLayout,
      },
      {
        path: '/detail/:conversationId',
        name: 'Conversation List',
        protected: true,
        component: ConversationList,
        layout: MainLayout,
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
