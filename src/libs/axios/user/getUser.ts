import { AxiosError } from 'axios'
import { CommonUserTypes } from '@/dtos/UserDto'
import axios from '../axiosInstance'

export default async function getUser() {
  const res = await axios.get('/users/me').catch((e: AxiosError) => {
    console.log(`${e.response?.status} error from getUser: ${e.message}`)
    return null
  })
  const user: CommonUserTypes | null = res ? (res.data as CommonUserTypes) : res

  return user
}
