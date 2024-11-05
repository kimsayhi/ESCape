import { UserTypes } from '@/dtos/UserDto'
import { API_PATH } from '../config/path'
import axiosInstance from '../axiosInstance'
import { FollowParams } from './types'

export const addFollow = async ({ userId }: FollowParams) => {
  const params = { userId }
  const response = await axiosInstance.post<UserTypes>(API_PATH.follow.default, params)
  return response.data ?? []
}

export const deleteFollow = async ({ userId }: FollowParams) => {
  const params = { userId }
  const response = await axiosInstance.delete<UserTypes>(API_PATH.follow.default, {
    data: params,
  })
  return response.data ?? []
}
