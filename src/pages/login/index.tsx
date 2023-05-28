import React, { useEffect } from 'react';
import { User, getAuth } from 'firebase/auth';
import { getKakaoLoginResult, redirectToKakaoLoginPage } from '../../auth';
import { UserRole } from '../../model';
import { getOrCreateResidentUser } from './get-or-create-user';
import { useAppDispatch } from '../../store';
import { setMode, setUser } from '../../store/slices/user.slice';
import { batch } from 'react-redux';
import { RoutePaths } from '../../constant';

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const getOrCreateUser = async (user: User) => {
    const urlSearchParams = new URLSearchParams();
    if (urlSearchParams.get('role') === UserRole.Resident) {
      const resident = await getOrCreateResidentUser(user);
      batch(() => {
        dispatch(setUser(resident.toJSON()));
        dispatch(setMode(UserRole.Resident));
      });
      window.location.assign(RoutePaths.residents);
    } else {
      const client = await getOrCreateResidentUser(user);
      batch(() => {
        dispatch(setUser(client.toJSON()));
        dispatch(setMode(UserRole.Client));
      });
      window.location.assign(RoutePaths.clients);
    }
  };

  useEffect(() => {
    (async () => {
      const auth = getAuth();
      const currentUser = auth.currentUser;

      if (currentUser) {
        await getOrCreateUser(currentUser);
        return;
      }

      try {
        const credential = await getKakaoLoginResult();
        if (!credential) return;
        await getOrCreateUser(credential.user);
      } catch (error) {
        if (import.meta.env.DEV) {
          console.error(error);
        }
        alert('로그인에 실패했습니다.');
      }
    })();
  }, []);

  return (
    <div>
      <button onClick={redirectToKakaoLoginPage}>카카오로 로그인</button>
    </div>
  );
};

export default Login;
