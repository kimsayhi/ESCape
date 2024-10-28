import { removeTokens } from '@/utils/authTokenStorage'
import axios, { AxiosError } from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://mogazoa-api.vercel.app/8-5',
})

axiosInstance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken')
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
    console.log('Authorization header:', config.headers.Authorization) // 토큰 확인
  }
  return config
})

axiosInstance.interceptors.response.use(
  (res) => res,
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
