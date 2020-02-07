import { lazy } from 'react';

export const ROUTE_PATH = {
  HOME: {
    path: '/',
    url: '/',
    name: 'Upload',
  },
  DETAIL: {
    path: '/detail/:id',
    url: '/detail',
    name: 'Detail'
  }
};

export default function createRoutes() {
  return [
    {
      ...ROUTE_PATH.HOME,
      exact: true,
      component: lazy(() => import('@pages/Home/index.tsx'))
    },
    {
      ...ROUTE_PATH.DETAIL,
      exact: true,
      component: lazy(() => import('@pages/Detail/index.tsx'))
    }
  ];
}
