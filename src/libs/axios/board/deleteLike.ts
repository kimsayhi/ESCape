import Axios from 'axios'

const BASE_URL = '/api'

interface deleteLikeProps {
  id: string | string[] | undefined
  userId: string | number | undefined
}

export async function deleteLike({ id, userId }: deleteLikeProps) {
  const url = `${BASE_URL}/articles/${id}/like/${userId}`
  const responses = await Axios.delete(url, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return responses.data
}
