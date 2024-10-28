import { AxiosError } from 'axios'
import { OAuthApp, oauthAppsReturn } from '@/dtos/AuthDto'
import axios from '../axiosInstance'

const OAUTH_APPS_PATH = '/oauthApps'

export default async function OAuthApps(appKey: string, provider: string): Promise<oauthAppsReturn> {
  const formData: OAuthApp = {
    appKey,
    provider,
  }

  try {
    const response = await axios.post(OAUTH_APPS_PATH, formData)
    const result: oauthAppsReturn = response.data

    if (!result) {
      throw new Error('회원가입 실패: 유효하지 않은 응답입니다.')
    }
    return result
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error('API 호출 중 오류 발생:', error.response?.data || error.message)
      throw new Error('회원가입 중 문제가 발생했습니다. 다시 시도해 주세요.')
    } else {
      console.error('예상치 못한 오류 발생:', error)
      throw new Error('예상치 못한 오류가 발생했습니다. 관리자에게 문의해 주세요.')
    }
  }
}
