import { CategoryType } from '@/dtos/CategoryDto'
import axiosInstance from '../axiosInstance'

export const getCategories = async () => {
  try {
    const categories = await axiosInstance.get('categories')
    return categories.data as CategoryType[]
  } catch {
    return []
  }
}
