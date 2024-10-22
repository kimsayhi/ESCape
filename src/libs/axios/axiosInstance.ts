import { removeTokens } from '@/utils/authTokenStorage'
import axios, { AxiosError } from 'axios'

const axiosInstance = axios.create({
  // baseURL: process.env.NEXT_PUBLIC_API_URL,
  baseURL: 'https://mogazoa-api.vercel.app/4-5/',
})

axiosInstance.interceptors.request.use((config) => {
  const reqConfig = config
  const accessToken = localStorage.getItem('accessToken')
  if (accessToken) {
    reqConfig.headers.Authorization = `Bearer ${accessToken}`
  }

  return config
})

axiosInstance.interceptors.response.use(
  (res) => res,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // accessToken이 유효하지 않을 경우, 토큰을 삭제하고 로그아웃 처리
      removeTokens()
      // 필요한 경우 로그아웃 처리나 리다이렉트 등의 추가 로직 작성 가능
      console.error('인증 에러가 발생했습니다. 다시 로그인해 주세요.')
    }
    return Promise.reject(error)
  },
)

export default axiosInstance
