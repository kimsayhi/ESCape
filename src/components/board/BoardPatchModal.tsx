import Modal from '@/components/@shared/modal/Modal'
import HeaderSection from '@/components/addboard/HeaderSection'
import ContentSection from '@/components/addboard/ContentSection'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getArticleDetail } from '@/libs/axios/board/getArticleDetail'
import { FormEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { patchArticles } from '@/libs/axios/board/patchArticles'
import { useAuth } from '@/contexts/AuthProvider'
import { postImage } from '@/libs/axios/board/postImage'

export interface BoardPatchModalProps {
  id: number | undefined
  isOpen: boolean
  onClick: () => void
  value: string | undefined
}

export default function BoardPatchModal({ id, isOpen, onClick, value }: BoardPatchModalProps) {
  // 게시글 수정을 할 때, 기존에 있던 값을 찾아 넣기 위한 useQuery
  // useState 의 기본값으로 담아야하기 때문에 useState 보다 상단에 위치
  const { data: articleDetailData } = useQuery({
    queryKey: ['articleDetail', String(id)],
    queryFn: () => getArticleDetail(String(id), String(user?.id)),
    enabled: !!id,
  })

  const [image, setImage] = useState<File | null>(null)
  const [title, setTitle] = useState<string | undefined>(articleDetailData?.title)
  const [titleError, setTitleError] = useState<string | null>(null)
  const [content, setContent] = useState<string | undefined>(articleDetailData?.content)
  const [contentError, setContentError] = useState<string | null>(null)
  const [userId, setUserId] = useState<string | number | undefined>()
  const router = useRouter()
  const queryClient = useQueryClient()
  const { user } = useAuth()

  // useQuery 가 정보를 가져오기 전에 잘못된 값이 useState 의 기본값으로 들어가는 걸 방지하기 위한 useEffect
  useEffect(() => {
    if (articleDetailData) {
      setTitle(articleDetailData.title)
      setContent(articleDetailData.content)
      setUserId(user?.id)
    }
  }, [articleDetailData, user?.id])

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

  // ContentSection 에서 받아온 수정된 값을 useState 에 반영하기 위한 이벤트 핸들러
  const handleFormDataChange = (value: {
    image: File | null
    title: string | undefined
    content: string | undefined
  }) => {
    setImage(value.image)
    setTitle(value?.title)
    setContent(value?.content)

    // 사용자가 값을 입력하면 다시 유효성 검사를 하기 위한 조건문
    if (value.title !== undefined) validateTitle(value.title)
    if (value.content !== undefined) validateContent(value.content)
  }

  // 게시글 전송을 위한 useMutation
  // 쿼리 무효화 작업이 완료된 후 페이지를 이동하기 위해 async await 를 사용하여 기다림
  const uploadPatchMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await patchArticles({ formData, id })

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
      try {
        await queryClient.invalidateQueries({ queryKey: ['articleDetail', String(id)] })
        await queryClient.invalidateQueries({ queryKey: ['likes'] })
        await queryClient.invalidateQueries({ queryKey: ['articles'] })
        router?.push(`/board/`)
      } catch (e) {
        console.error(e)
      }
    },
  })

  // 작성을 완료한 value 를 formData 에 담아 보내기 위한 이벤트 핸들러
  // formData 를 활용한 이유는 이미지 파일이 JSON 형태로 전송할 수 없는 문제가 있어서 임시 사용
  // URL 로 받아와서 string 형태로 처리할 수 있는 방법이 있으면 개선 예정
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (!validateTitle(title) || !validateContent(content)) {
      return
    }

    const formData = new FormData()
    formData.append('image', image as File)
    formData.append('title', title as string)
    formData.append('content', content as string)
    formData.append('userId', String(userId))

    uploadPatchMutation.mutate(formData, {
      onSuccess: () => {
        onClick()
      },
    })
  }

  return (
    <div>
      {isOpen && (
        <Modal
          onClick={onClick}
          modalFrameClassNames="max-h-[90vh] w-[320px] md:w-[520px] overflow-scroll scrollbar-hidden scrollbar-hide"
        >
          <div className="md:6 relative mx-4 pb-[100px] pt-[50px] md:pb-0 xl:mx-auto">
            <form onSubmit={handleSubmit}>
              <HeaderSection>{value}</HeaderSection>
              <ContentSection
                title={title}
                content={content}
                onFormDataChange={handleFormDataChange}
                contentError={contentError}
                titleError={titleError}
              />
            </form>
          </div>
        </Modal>
      )}
    </div>
  )
}
