export type OAuthProviders = 'GOOGLE' | 'KAKAO'

export interface AuthTokens {
  accessToken: string
}

export interface SignInForm {
  email: string
  password: string
}

export interface OAuthSignInForm {
  token: string
  state?: string
  redirectUri?: string
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
  }
}
