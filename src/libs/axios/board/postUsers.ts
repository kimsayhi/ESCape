import Axios from 'axios'
import { UserData } from '@/dtos/ArticleDto'

const BASE_URL = '/api'

export async function postUsers({ id, nickname, description, image }: UserData) {
  const url = `${BASE_URL}/users`
  const responses = await Axios.post(
    url,
    { id, nickname, description, image },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
  return responses.data
}
