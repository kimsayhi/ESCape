import { AuthTokens } from '@/dtos/AuthDto'

/** accessToken과 refreshToken을 localStorage에 저장하는 함수 */
export function saveTokens(tokens: AuthTokens) {
  localStorage.setItem('accessToken', tokens.accessToken)
}

/** 저장된 accessToken을 localStorage에서 제거하는 함수 */
export function removeTokens() {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('authCode')
}
