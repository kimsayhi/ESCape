export interface ProductTypes {
  updatedAt: string
  createdAt: string
  writerId: number
  categoryId: number
  favoriteCount: number
  reviewCount: number
  rating: number
  image: string
  name: string
  id: number
}

export interface ProductListTypes {
  nextCursor: number
  list: ProductTypes[]
}

export interface CategoryTypes {
  id: number
  name: string
}

export interface CategoryMetricTypes {
  rating: number
  favoriteCount: number
  reviewCount: number
}

export interface ProductDetailTypes {
  id: number
  name: string
  description: DescriptionTypes
  image: string
  rating: number
  reviewCount: number
  favoriteCount: number
  categoryId: number
  createdAt: string
  updatedAt: string
  writerId: number
  isFavorite: boolean
  category: CategoryTypes
  categoryMetric: CategoryMetricTypes
}
// Description 타입 지정
export interface DescriptionTypes {
  loc: string
  spot: string
  des: string
  lev: number
  time: number
  hor: number
  act: number
  url: string
}

export interface UserTypes {
  image: string
  nickname: string
  id: number
}

export interface ReviewImageTypes {
  source: string
  id: number
}

export interface ProductReviewListTypes {
  user: UserTypes
  reviewImages: ReviewImageTypes[]
  productId: number
  userId: number
  updatedAt: string
  createdAt: string
  isLiked: true
  likeCount: number
  content: string
  rating: number
  id: number
}

export interface ProductReviewsResponseTypes {
  nextCursor: number
  list: []
}
