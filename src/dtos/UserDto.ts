export interface CommonUserTypes {
  updatedAt: string;
  createdAt: string;
  teamId: string;
  image: string;
  description: string;
  nickname: string;
  id: number;
}

export interface MostFavoriteCategoryTypes {
  name: string;
  id: number;
}

export interface UserTypes extends CommonUserTypes {
  mostFavoriteCategory: MostFavoriteCategoryTypes;
  averageRating: number;
  reviewCount: number;
  followeesCount: number;
  followersCount: number;
  isFollowing: boolean;
}

export interface RankingTypes extends CommonUserTypes {
  reviewCount: number;
  followersCount: number;
}

/**
 * created-products, reviewed-products, favorite-products 타입은
 * ProductDto.ts 파일에 있는 ProductTypes, ProductListTypes와 같음
 */

export interface FolloweeTypes extends CommonUserTypes {}

export interface FolloweeListTypes {
  follower: FolloweeTypes;
  id: number;
}

export interface FolloweesResponseTypes {
  nextCursor: number;
  list: FolloweeListTypes[];
}

export interface FollowerTypes extends CommonUserTypes {}

export interface FollowerListTypes {
  follower: FollowerTypes;
  id: number;
}

export interface FollowersResponseTypes {
  nextCursor: number;
  list: FollowerListTypes[];
}