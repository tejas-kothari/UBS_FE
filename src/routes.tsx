import { PartialRouteObject } from 'react-router';
import DashboardLayout from './layouts/DashboardLayout';
import ChartView from './views/ChartView';

const routes = [
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      {
        path: 'chart',
        element: <ChartView />
      }
    ]
  }
] as PartialRouteObject[];

export default routes;
