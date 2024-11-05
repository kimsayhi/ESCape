import { ProductDetailTypes, DescriptionTypes, ResponseProductListTypes } from '@/dtos/ProductDto'
import axiosInstance from '../axiosInstance'

export interface ProductQueryParams {
  keyword?: string | null
  categoryId?: number | null
  order?: 'rating' | 'recent' | 'reviewCount' | null
  cursor?: number | null
}

export const getProduct = async ({
  keyword,
  categoryId,
  order,
  cursor,
}: ProductQueryParams): Promise<ResponseProductListTypes> => {
  try {
    const res = await axiosInstance.get('products', {
      params: {
        keyword,
        category: categoryId,
        order,
        cursor,
      },
    })
    return res.data
  } catch (err) {
    console.log(err)
    return { nextCursor: 0, list: [] } as ResponseProductListTypes
  }
}

export const fetchProductDetails = async (productId: number): Promise<ProductDetailTypes> => {
  const response = await axiosInstance.get(`/products/${productId}`)
  const productData = response.data

  // description이 JSON 문자열일 경우 객체로 변환
  if (typeof productData.description === 'string') {
    productData.description = JSON.parse(productData.description) as DescriptionTypes
  }

  return productData
}

export const addFavorite = async (productId: number) => {
  const response = await axiosInstance.post(`/products/${productId}/favorite`)
  return response.data
}

export const removeFavorite = async (productId: number) => {
  const response = await axiosInstance.delete(`/products/${productId}/favorite`)
  return response.data
}
