import Axios from 'axios'

const BASE_URL = '/api'

export async function deleteComments(id: number | undefined) {
  try {
    const url = `${BASE_URL}/comments/${id}`
    await Axios.delete(url)
  } catch (e) {
    console.error('데이터를 삭제하는데 오류가 있습니다:', e)
    throw e
  }
}
