import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RoutePaths } from './constant';
import { Redirect } from './pages/redirect';
import ResidentList from './pages/resident-list';
import ClientList from './pages/client-list';
import Login from './pages/login';
import PropertyMap from './pages/property-map';

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={RoutePaths.root} element={<Redirect />} />
        <Route path={RoutePaths.residents} element={<ResidentList />} />
        <Route path={RoutePaths.clients} element={<ClientList />} />
        <Route path={RoutePaths.login} element={<Login />} />
        <Route path={RoutePaths.propertyMap} element={<PropertyMap />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
