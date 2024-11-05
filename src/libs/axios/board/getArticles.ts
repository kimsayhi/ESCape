import Axios from 'axios'
import { BoardData } from '@/dtos/ArticleDto'

const BASE_URL = '/api'

interface getArticlesParams {
  selectedOption: string
  searchValue: string
  currentPage: number
  userId: string | number | undefined
}

export async function getArticles({
  selectedOption,
  searchValue,
  currentPage,
  userId,
}: getArticlesParams): Promise<BoardData> {
  try {
    let orderBy = ''
    if (selectedOption === '최신순') {
      orderBy = 'recent'
    } else if (selectedOption === '인기순') {
      orderBy = 'like'
    }

    const url = searchValue
      ? `${BASE_URL}/articles/${userId}?page=${currentPage}&pageSize=4&orderBy=${orderBy}&keyword=${searchValue}`
      : `${BASE_URL}/articles/${userId}?page=${currentPage}&pageSize=4&orderBy=${orderBy}`

    const response = await Axios.get(url)
    return response.data as BoardData
  } catch (e) {
    console.error('데이터를 불러오는데 오류가 있습니다:', e)
    throw e
  }
}
