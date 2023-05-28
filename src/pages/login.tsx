import React, { useEffect } from 'react';
import { loginWithKakao } from '../auth';
import { UserRole } from '../model';

const Login: React.FC = () => {
  useEffect(() => {
    (async () => {
      const user = await loginWithKakao(UserRole.Client);
      console.log(user);
      alert(user?.email);
    })();
  }, []);
  return <div>Login</div>;
};

export default Login;
