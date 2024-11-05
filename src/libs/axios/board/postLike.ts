import Axios from 'axios'

const BASE_URL = '/api'

interface postLikeProps {
  id: string | string[] | undefined
  userId: string | number | undefined
}

export async function postLike({ id, userId }: postLikeProps) {
  const url = `${BASE_URL}/articles/${id}/like/${userId}`
  const responses = await Axios.post(url, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return responses.data
}
