import { removeTokens } from '@/utils/authTokenStorage'
import axios, { AxiosError } from 'axios'

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

axiosInstance.interceptors.request.use(config => {
  const modifiedConfig = { ...config }

  // SSR 사용을 위해 window가 undefined가 아닐때만 실행
  if (typeof window !== 'undefined') {
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
      modifiedConfig.headers.Authorization = `Bearer ${accessToken}`
    }
  }
  return modifiedConfig
})

axiosInstance.interceptors.response.use(
  res => res,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      removeTokens()
      console.error('인증 에러가 발생했습니다. 다시 로그인해 주세요.')
      // 여기서 더 이상 router를 사용하지 않음
    } else if (error.response?.status === 403) {
      console.error('접근 권한이 없습니다.')
    } else if (error.response?.status === 500) {
      console.error('서버 오류가 발생했습니다.')
    }
    return Promise.reject(error)
  },
)

export default axiosInstance
