export interface CommonUserTypes {
  updatedAt: string
  createdAt: string
  teamId: string
  image: string
  description: string
  nickname: string
  id: number
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

/**
 * created-products, reviewed-products, favorite-products 타입은
 * ProductDto.ts 파일에 있는 ProductTypes, ProductListTypes와 같음
 */

export interface FollowTypes extends CommonUserTypes {}

export interface FollowListTypes {
  follow: FollowTypes
  id: number
}

export interface FollowResponseTypes {
  nextCursor: number
  list: FollowListTypes[]
}
