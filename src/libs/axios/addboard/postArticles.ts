import Axios from 'axios'
import { ArticleFormData } from '@/dtos/ArticleDto'

const BASE_URL = '/api'

export async function postArticles(formData: FormData) {
  const url = `${BASE_URL}/articles`
  const responses = await Axios.post<ArticleFormData>(url, formData, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return responses.data
}
