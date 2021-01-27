import React from 'react';
import { Navigate, PartialRouteObject } from 'react-router';
import DashboardLayout from './layouts/DashboardLayout';
import ChartView from './views/ChartView';
import CompaniesListView from './views/CompaniesListView';
import CompanyView from './views/CompanyView/index';
import ComparingCompaniesView from './views/ComparingCompaniesView';
import FeaturesView from './views/FeaturesView';
//import FeaturesView from './views/FeaturesView';
import RoundView from './views/RoundView';
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
        path: 'rounds',
        element: <RoundView />
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
        element: <Navigate to="/companies/list" />
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
        path: 'compare',
        element: <ComparingCompaniesView />
      }
    ]
  }
] as PartialRouteObject[];

export default routes;
