import { PartialRouteObject } from 'react-router';
import DashboardLayout from './layouts/DashboardLayout';
import ChartView from './views/ChartView';
import PortfolioView from './views/PortfolioView';
import SubsectorView from './views/SubsectorView';
import CompanyView from './views/CompanyView';
import FeaturedCompaniesView from './views/FeaturedCompaniesView';

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
  },
  {
    path: '/companies',
    element: <DashboardLayout />,
    children: [
      {
        path: ':companyId',
        element: <CompanyView />
      },
      {
        path: 'featured',
        element: <FeaturedCompaniesView />
      }
    ]
  }
] as PartialRouteObject[];

export default routes;
