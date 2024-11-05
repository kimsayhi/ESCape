import { useState } from 'react'

interface UseEditProfileProps {
  image: string | File | null
  nickname: string
  description: string
  TEXTAREA_MAX_LENGTH: number
}

function useEditProfile({ image, nickname, description, TEXTAREA_MAX_LENGTH }: UseEditProfileProps) {
  const [formValues, setFormValues] = useState({
    image,
    nickname,
    description,
  })
  const [previewImage, setPreviewImage] = useState<string | File | null>(image ?? null)
  const [textareaCount, setTextareaCount] = useState<number>(description.length)

  /** @todo 파일 이름 한글인지 체크 */
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return

    if (previewImage && typeof previewImage === 'string') {
      URL.revokeObjectURL(previewImage)
    }

    const selectedImageFile = e.target.files[0]
    const nextImage = URL.createObjectURL(selectedImageFile)
    setPreviewImage(nextImage)
    setFormValues(prevValues => ({
      ...prevValues,
      image: selectedImageFile,
    }))
  }

  const handleFileInputDelete = () => {
    if (previewImage && typeof previewImage === 'string') {
      URL.revokeObjectURL(previewImage)
    }

    setFormValues(prevValues => ({
      ...prevValues,
      image: null,
    }))
    setPreviewImage(null)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    setFormValues(prevValues => ({
      ...prevValues,
      [e.target.name]: inputValue,
    }))
  }

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textareaValue = e.target.value.slice(0, TEXTAREA_MAX_LENGTH)
    setTextareaCount(textareaValue.length)
    setFormValues(prevValues => ({
      ...prevValues,
      [e.target.name]: textareaValue,
    }))
  }

  return {
    formValues,
    previewImage,
    textareaCount,
    handleFileInputChange,
    handleFileInputDelete,
    handleInputChange,
    handleTextAreaChange,
  }
}

export default useEditProfile
