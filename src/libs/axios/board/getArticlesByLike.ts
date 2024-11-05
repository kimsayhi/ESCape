import Axios from 'axios'
import { BoardData } from '@/dtos/ArticleDto'

const BASE_URL = '/api'

// eslint-disable-next-line default-param-last
export async function getArticlesByLike(page = 0, pageSize = 3, userID: string): Promise<BoardData> {
  try {
    const url = `${BASE_URL}/articles/${userID}?page=${page}&pageSize=${pageSize}&orderBy=like`
    const response = await Axios.get(url)
    return response.data as BoardData
  } catch (e) {
    console.error('데이터를 불러오는데 오류가 있습니다:', e)
    throw e
  }
}
