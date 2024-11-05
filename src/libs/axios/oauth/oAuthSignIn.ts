import { OAuthProviders, OAuthSignInForm, SignInReturn } from '@/dtos/AuthDto'
import axios from '../axiosInstance'

export default async function oAuthSignIn(formData: OAuthSignInForm, provider: OAuthProviders): Promise<SignInReturn> {
  const path = `/auth/signIn/${provider}`
  try {
    const response = await axios.post<SignInReturn>(path, formData)
    return response.data
  } catch (error) {
    console.error('OAuth sign-in error:', error)
    throw error
  }
}
