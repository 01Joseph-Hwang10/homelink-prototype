import {
  OAuthProvider,
  getAuth,
  signInWithRedirect,
  getRedirectResult,
  UserCredential,
} from 'firebase/auth';
import { AbodeLocation, Client, Resident, UserRole } from '../model';

/**
 * @description
 * 카카오 로그인을 위한 함수입니다.
 * 실행하면 카카오 로그인 프로세스가 진행되고
 * 로그인이 완료되면 firebase의 auth에 로그인 정보가 저장됩니다.
 */
export const loginWithKakao = async (
  role: UserRole
): Promise<Client | Resident | null> => {
  const kakaoProvider = new OAuthProvider('oidc.kakao');
  const auth = getAuth();
  await signInWithRedirect(auth, kakaoProvider);
  let userCredential: UserCredential;
  try {
    const result = await getRedirectResult(auth);
    if (!result) throw new Error('Redirect window not opened');
    userCredential = result;
  } catch (error) {
    alert('인증에 실패했습니다.');
    window.location.assign('/');
    return null;
  }
  const email = userCredential.user.email;
  if (!email) throw new Error('Email not found');
  const uid = userCredential.user.uid;
  console.log(userCredential.user);
  alert(email);
  if (role === UserRole.Client) {
    const client = Client.fromJSON({ uid, email, requests: [] });
    await client.create();
    return client;
  } else if (role === UserRole.Resident) {
    const resident = Resident.fromJSON({
      uid,
      email,
      requests: [],
      abode: AbodeLocation.UNKNOWN,
    });
    await resident.create();
    return resident;
  } else {
    throw new Error('Invalid role');
  }
};
