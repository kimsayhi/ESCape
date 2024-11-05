export interface CommonUserTypes {
  updatedAt: string
  createdAt: string
  teamId: string
  image: string | File | null
  description: string
  nickname: string
  id: number | string
}

export interface MostFavoriteCategoryTypes {
  name: string
  id: number
}

export interface UserTypes extends CommonUserTypes {
  mostFavoriteCategory: MostFavoriteCategoryTypes
  averageRating: number
  reviewCount: number
  followeesCount: number
  followersCount: number
  isFollowing: boolean
}

export interface RankingTypes extends CommonUserTypes {
  reviewCount: number
  followersCount: number
}

export interface UserRanking {
  updatedAt: string
  createdAt: string
  teamId: string
  image: string | null
  description: string
  nickname: string
  id: number
  reviewCount: number
  followersCount: number
}

/**
 * created-products, reviewed-products, favorite-products 타입은
 * ProductDto.ts 파일에 있는 ProductTypes, ProductListTypes와 같음
 */

export interface FollowListTypes {
  follower?: CommonUserTypes
  followee?: CommonUserTypes
  id: number
}

export interface FollowResponseTypes {
  nextCursor: number
  list: FollowListTypes[]
}
