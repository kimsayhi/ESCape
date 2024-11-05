import Axios from 'axios'
import { CommentFormData } from '@/dtos/ArticleDto'

const BASE_URL = '/api'

interface postCommentsProps {
  id: string | string[] | undefined
  comment: CommentFormData
}

export async function postComments({ id, comment }: postCommentsProps) {
  const url = `${BASE_URL}/articles/${id}/comments`
  const responses = await Axios.post(url, comment, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return responses.data
}
