import { AxiosError } from 'axios'
import { OAuthProviders, OAuthSignInForm, SignInReturn } from '@/dtos/AuthDto'
import { saveTokens } from '@/utils/authTokenStorage'
import axios from '../axiosInstance'

export default async function oAuthSignIn(formData: OAuthSignInForm, provider: OAuthProviders) {
  const path = `/auth/signIn/${provider}`

  try {
    const res = await axios.post(path, formData)
    const result: SignInReturn | null = res.data as SignInReturn

    if (!result || !result.accessToken) {
      console.error('No access token received:', result)
      return null
    }

    const { accessToken } = result
    saveTokens({ accessToken })
    return result
  } catch (error) {
    const axiosError = error as AxiosError
    console.error(axiosError.response?.data || 'API 호출 중 오류 발생')
    return null
  }
}
