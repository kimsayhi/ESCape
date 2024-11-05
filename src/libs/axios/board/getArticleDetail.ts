import Axios from 'axios'
import { ArticleDetail } from '@/dtos/ArticleDto'

const BASE_URL = '/api'

export async function getArticleDetail(id: string | string[] | undefined, userId: string): Promise<ArticleDetail> {
  try {
    const url = `${BASE_URL}/articles/${id}/${userId}`

    const response = await Axios.get(url)
    return response.data as ArticleDetail
  } catch (e) {
    console.error('데이터를 불러오는데 오류가 있습니다:', e)
    throw e
  }
}
