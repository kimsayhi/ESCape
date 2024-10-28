// libs/axios/productApi.ts
import axiosInstance from './axiosInstance'
import { ProductDetailTypes, DescriptionTypes } from '@/dtos/ProductDto'

export const fetchProductDetails = async (teamId: string, productId: number): Promise<ProductDetailTypes> => {
  const response = await axiosInstance.get(`/${teamId}/products/${productId}`)
  const productData = response.data

  // description이 JSON 문자열일 경우 객체로 변환
  if (typeof productData.description === 'string') {
    productData.description = JSON.parse(productData.description) as DescriptionTypes
  }

  return productData
}
