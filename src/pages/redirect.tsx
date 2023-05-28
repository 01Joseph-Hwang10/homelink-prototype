import React, { useEffect } from 'react';
import { redirect } from 'react-router-dom';
import { RoutePaths } from '../constant';

export const Redirect: React.FC = () => {
  useEffect(() => {
    redirect(RoutePaths.residents);
  }, []);
  return <></>;
};
