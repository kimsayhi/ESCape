export interface CreateReviewRequestBody {
  productId: number
  images: string[]
  content: string
  rating: number
}

export interface UpdateReviewRequestBody {
  images: ReviewImage[]
  content: string
  rating: number
}

export interface ReviewImage {
  id?: number
  source?: string
}
