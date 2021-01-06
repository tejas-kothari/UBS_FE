import { PartialRouteObject } from 'react-router';
import DashboardLayout from './layouts/DashboardLayout';
import ChartView from './views/ChartView';
import PortfolioView from './views/PortfolioView';
import SubsectorView from './views/SubsectorView';

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
      },
      {
        path: 'subsectors',
        element: <SubsectorView/>
      }
    ]
  }
] as PartialRouteObject[];

export default routes;
