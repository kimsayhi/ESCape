import { AxiosError } from 'axios'
import { OAuthProviders, OAuthSignUpForm } from '@/dtos/AuthDto'
import axios from '../axiosInstance'

export default async function oAuthSignUp(formData: OAuthSignUpForm, provider: OAuthProviders) {
  const path = `/auth/signUp/${provider}`
  try {
    await axios.post(path, formData)
  } catch (error: unknown) {
    const e = error as AxiosError
    console.log(`${e.response?.status} error from signUp: ${e.message}`)
    return false
  }
  return true
}
