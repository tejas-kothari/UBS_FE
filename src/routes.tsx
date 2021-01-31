import React from 'react';
import { Navigate, PartialRouteObject } from 'react-router';
import DashboardLayout from './layouts/DashboardLayout';
import CompaniesListView from './views/CompaniesListView';
import CompanyView from './views/CompanyView/index';
import ComparingCompaniesView from './views/ComparingCompaniesView';
import FeaturesView from './views/FeaturesView';
import SubsectorView from './views/SubsectorView';

const routes = [
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      {
        path: 'features',
        element: <FeaturesView />
      },
      {
        path: 'subsectors',
        element: <SubsectorView />
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
