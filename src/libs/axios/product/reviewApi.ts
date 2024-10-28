import axiosInstance from './axiosInstance'
import { ProductReviewListTypes } from '@/dtos/ProductDto'

export const fetchReviews = async (
  teamId: string,
  productId: number,
  sortOption: string,
): Promise<ProductReviewListTypes[]> => {
  const response = await axiosInstance.get(`/${teamId}/products/${productId}/reviews`, {
    params: {
      order: sortOption,
    },
  })
  return response.data.list
}
