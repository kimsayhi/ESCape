import { FollowResponseTypes, UserTypes } from '@/dtos/UserDto'
import { ResponseProductListTypes } from '@/dtos/ProductDto'
import { ImageTypes } from '@/dtos/ImageDto'
import axiosInstance from '../axiosInstance'
import { API_PATH } from '../config/path'
import {
  AddImageFileParams,
  GetUserFollowsParams,
  GetUserInfoParams,
  GetUserProductsParams,
  UpdateMyInfoParams,
} from './types'

export const getMyInfo = async () => {
  const response = await axiosInstance.get<UserTypes>(API_PATH.user.me)
  return response.data ?? []
}

export const updateMyInfo = async ({ image, nickname, description }: UpdateMyInfoParams) => {
  const params = { image, nickname, description }
  const response = await axiosInstance.patch<UserTypes>(API_PATH.user.me, params)
  return response.data ?? []
}

export const getUserInfo = async ({ userId }: GetUserInfoParams) => {
  const response = await axiosInstance.get<UserTypes>(API_PATH.user.user(userId))
  return response.data ?? []
}

export const getUserProducts = async ({ userId, type, cursor }: GetUserProductsParams) => {
  const params = { cursor }
  const url = type === 'reviewed' ? API_PATH.user.reviewedProducts(userId) : API_PATH.user.favoriteProducts(userId)
  const response = await axiosInstance.get<ResponseProductListTypes>(url, { params })
  return response.data ?? []
}

export const getUserFollows = async ({ userId, type, cursor }: GetUserFollowsParams) => {
  const params = { cursor }
  const url = type === 'follower' ? API_PATH.user.followers(userId) : API_PATH.user.followees(userId)
  const response = await axiosInstance.get<FollowResponseTypes>(url, { params })
  return response.data ?? []
}

export const addImageFile = async ({ image }: AddImageFileParams) => {
  const formData = new FormData()
  formData.append('image', image)

  const response = await axiosInstance.post<ImageTypes>(API_PATH.image.default, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data.url ?? []
}
