import Axios from 'axios'

const BASE_URL = '/api'

interface postImageProps {
  id: string
  formData: FormData
}

export async function postImage({ id, formData }: postImageProps) {
  const url = `${BASE_URL}/images/${id}`
  formData.append('file', formData.get('image') as string)
  const response = await Axios.post(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data
}
