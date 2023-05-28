import {
  OAuthProvider,
  getAuth,
  signInWithRedirect,
  getRedirectResult,
  UserCredential,
} from 'firebase/auth';

/**
 * @description
 * 카카오 로그인페이지로 리다이렉트합니다.
 */
export const redirectToKakaoLoginPage = (): void => {
  const kakaoProvider = new OAuthProvider('oidc.kakao');
  const auth = getAuth();
  signInWithRedirect(auth, kakaoProvider);
};

/**
 * @description
 * 카카오 로그인 결과를 받아옵니다.
 * {@link redirectToKakaoLoginPage} 함수를 통해 리다이렉트된 페이지에서 로그인이 완료되었을 시에만
 * 오류 없이 {@link UserCredential} 객체를 반환합니다.
 *
 * 만약 리다이렉트 페이지가 아직 열리지 않았을 경우에는 null을 반환합니다.
 */
export const getKakaoLoginResult = async (): Promise<UserCredential | null> => {
  const result = await getRedirectResult(getAuth());
  if (!result) return null;
  if (!result.user.email) throw new Error('이메일이 없습니다.');
  return result;
};
