import HeaderSection from '@/components/addboard/HeaderSection'
import ContentSection from '@/components/addboard/ContentSection'
import { FormEvent, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { postArticles } from '@/libs/axios/addboard/postArticles'
import { useRouter } from 'next/router'
import { useAuth } from '@/contexts/AuthProvider'
import { postImage } from '@/libs/axios/board/postImage'

export default function AddBoardsPage() {
  const [image, setImage] = useState<File | null>(null)
  const [title, setTitle] = useState<string | undefined>('')
  const [content, setContent] = useState<string | undefined>('')
  const [titleError, setTitleError] = useState<string | null>(null)
  const [contentError, setContentError] = useState<string | null>(null)
  const [userId, setUserId] = useState<string | number | undefined>()
  const router = useRouter()
  const queryClient = useQueryClient()
  const { user } = useAuth()

  // 제목 유효성 검사
  const validateTitle = (title: string | undefined) => {
    if (!title) {
      setTitleError('제목을 입력해주세요.')
      return false
    }
    setTitleError(null)
    return true
  }

  // 내용 유효성 검사
  const validateContent = (content: string | undefined) => {
    if (!content) {
      setContentError('내용을 입력해주세요.')
      return false
    }
    if (content.length > 300) {
      setContentError('내용은 300자 미만이어야 합니다.')
      return false
    }
    setContentError(null)
    return true
  }

  // ContentSection 컴포넌트에서 받아온 value 값들을 적용하기 위한 이벤트 핸들러
  const handleFormDataChange = (value: {
    image: File | null
    title: string | undefined
    content: string | undefined
  }) => {
    setImage(value.image)
    setTitle(value?.title)
    setContent(value?.content)
    setUserId(user?.id)
  }

  // 게시글 전송을 위한 useMutation
  // 쿼리 무효화 작업이 완료된 후 페이지를 이동하기 위해 async await 를 사용하여 기다림
  const uploadPostMutation = useMutation({
    mutationFn: async (newPost: FormData) => {
      const response = await postArticles(newPost)

      // postArticles 가 끝난 후 생성된 게시글의 id를 받아와서 이미지를 전송
      // 게시글용 외부 API 가 file 형태로 받기 때문에, file 형태로 이름을 변경해서 전달
      if (response.id && image) {
        const imageFormData = new FormData()
        imageFormData.append('file', image)
        await postImage({
          id: response.id,
          formData: imageFormData,
        })
      }
      return response
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['articles'] })
      await queryClient.invalidateQueries({ queryKey: ['likes'] })
      await router.push('/board')
    },
  })

  // 작성을 완료한 value 를 formData 에 담아 보내기 위한 이벤트 핸들러
  // 이미지 값을 별도로 분리했기 때문에 formData 를 활용할 필요는 없지만 잘 작동하기 때문에 굳이 수정 안함
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (!validateTitle(title) || !validateContent(content)) {
      return
    }

    const formData = new FormData()
    formData.append('title', title as string)
    formData.append('content', content as string)
    formData.append('userId', String(userId))

    uploadPostMutation.mutate(formData)

    setTitle('')
    setContent('')
  }

  return (
    <div className="md:6 relative mx-4 py-[100px] xl:mx-auto xl:w-[1200px]">
      <form onSubmit={handleSubmit}>
        <HeaderSection>게시글 쓰기</HeaderSection>
        <ContentSection
          title={title}
          titleError={titleError}
          contentError={contentError}
          content={content}
          onFormDataChange={handleFormDataChange}
        />
      </form>
    </div>
  )
}
