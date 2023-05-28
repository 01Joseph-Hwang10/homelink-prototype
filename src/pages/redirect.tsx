import React, { useEffect } from 'react';
import { RoutePaths } from '../constant';

export const Redirect: React.FC = () => {
  useEffect(() => {
    window.location.assign(RoutePaths.residents);
  }, []);
  return <></>;
};
