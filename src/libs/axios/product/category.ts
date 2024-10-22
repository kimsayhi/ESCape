import { CategoryType } from '@/dtos/CategoryDto'
import { axiosInstance } from '../instance'

export const getCategories = async () => {
  const categories = await axiosInstance.get('categories')
  return categories.data as CategoryType[]
}
