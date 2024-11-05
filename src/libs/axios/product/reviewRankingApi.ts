import { UserRanking } from '@/dtos/UserDto'
import axiosInstance from '../axiosInstance'

export const getUsersRanking = async () => {
  try {
    const response = await axiosInstance.get<UserRanking[]>('users/ranking')
    return response.data
  } catch {
    return []
  }
}
