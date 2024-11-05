export interface UpdateMyInfoParams {
  image: string
  nickname: string
  description: string
}

export interface GetUserInfoParams {
  userId: string | number
}

export interface GetUserProductsParams {
  userId: string | number
  type: string
  cursor?: number | null
}

export interface GetUserFollowsParams {
  userId: string | number
  type: string
  cursor?: number | null
}

export interface AddImageFileParams {
  image: File
}
