export interface getUserInfoParams {
  userId: string | number
}

export interface getUserProductsParams {
  userId: string | number
  type: string
}

export interface getUserFollowsParams {
  userId: string | number
  type: string
}
