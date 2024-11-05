export interface UpdateUserRequestBody {
  description: string // 사용자 설명, 최대 300자
  nickname: string // 닉네임, 최소 1자에서 최대 20자
  image: string // 프로필 이미지 URL, https://로 시작해야 함
}

export type OAuthProviders = 'google' | 'kakao'

export interface AuthTokens {
  accessToken: string
}

export interface SignInForm {
  email: string
  password: string
}

export interface OAuthSignInForm {
  redirectUri?: string
  token: string
}
export interface OAuthSignUpForm {
  nickname: string
  redirectUri?: string
  token: string
}

export interface SignUpForm {
  email: string
  nickname: string
  password: string
  passwordConfirmation: string
}

export interface SignInReturn {
  accessToken: string
  user: {
    id: number
    email: string
    nickname: string
    teamId: string
    updatedAt: string
    createdAt: string
    image: string | null
    description: string
  }
}
export interface oauthAppsReturn {
  createdAt: string
  updatedAt: string
  appKey: string
  provider: OAuthProviders
  teamId: string
  id: number
}
