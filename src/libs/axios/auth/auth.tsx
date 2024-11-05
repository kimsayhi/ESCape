import { AuthTokens, SignInForm, SignInReturn, SignUpForm } from '@/dtos/AuthDto'
import { saveTokens } from '@/utils/authTokenStorage'
import { AxiosError, AxiosResponse } from 'axios'
import axios from '../axiosInstance'

export async function signIn(formData: SignInForm) {
  let res: AxiosResponse<SignInReturn>
  try {
    res = await axios.post('/auth/signIn', formData)
  } catch (error: unknown) {
    const e = error as AxiosError
    console.log(`${e.response?.status} error from signIn: ${e.message}`)
    return false
  }

  const result: SignInReturn = res.data
  const { accessToken }: AuthTokens = result
  saveTokens({ accessToken })
  return true
}

export async function signUp(formData: SignUpForm) {
  try {
    await axios.post('/auth/signUp', formData)
  } catch (error: unknown) {
    const e = error as AxiosError
    console.log(`${e.response?.status} error from signUp: ${e.message}`)
    return false
  }
  return true
}
