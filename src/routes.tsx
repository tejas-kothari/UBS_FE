import React from 'react';
import { Navigate, PartialRouteObject } from 'react-router';
import DashboardLayout from './layouts/DashboardLayout';
import ChartView from './views/ChartView';
import CompaniesListView from './views/CompaniesListView';
import CompanyView from './views/CompanyView/index';
import FeaturedCompaniesView from './views/FeaturedCompaniesView';
import FeaturesView from './views/FeaturesView';
//import PortfolioView from './views/PortfolioView';
import SubsectorView from './views/SubsectorView';
import TestView from './views/TestView';

const routes = [
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      {
        path: 'chart',
        element: <ChartView />
      },
      /*{
        path: 'portfolio',
        element: <PortfolioView />
      },   */
      {
        path: 'features',
        element: <FeaturesView />
      },
      {
        path: 'subsectors',
        element: <SubsectorView />
      },
      {
        path: 'test',
        element: <TestView />
      },
      {
        path: '/',
        element: <Navigate to="/companies/featured" />
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
        path: 'list',
        element: <CompaniesListView />
      },
      {
        path: 'featured',
        element: <FeaturedCompaniesView />
      }
    ]
  }
] as PartialRouteObject[];

export default routes;
