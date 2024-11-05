import Axios from 'axios'

const BASE_URL = '/api'

interface patchCommentsProps {
  id: number | undefined
  content: string | undefined
}

export async function patchComments({ id, content }: patchCommentsProps) {
  const url = `${BASE_URL}/comments/${id}`
  const responses = await Axios.patch(url, content, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return responses.data
}
