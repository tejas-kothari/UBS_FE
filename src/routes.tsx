import { PartialRouteObject } from 'react-router';
import DashboardLayout from './layouts/DashboardLayout';
import ChartView from './views/ChartView';
import PortfolioView from './views/PortfolioView';

const routes = [
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      {
        path: 'chart',
        element: <ChartView />
      },
      {
        path: 'portfolio',
        element: <PortfolioView />
      }
    ]
  }
] as PartialRouteObject[];

export default routes;
