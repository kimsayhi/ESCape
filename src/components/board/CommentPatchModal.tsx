import Modal from '@/components/@shared/modal/Modal'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import DetailPostCommentSection from '@/components/board/DetailPostCommentSection'
import { ChangeEvent, FormEvent, useState } from 'react'
import { patchComments } from '@/libs/axios/board/patchComments'

export interface CommentPatchModalProps {
  id: number | undefined
  content: string | undefined
  isOpen: boolean
  onClick: () => void
  currentPage: number
  dataId: string | string[] | undefined
}

export default function CommentPatchModal({
  id,
  content,
  isOpen,
  onClick,
  currentPage,
  dataId,
}: CommentPatchModalProps) {
  const [comment, setComment] = useState(content)
  const [commentError, setCommentError] = useState<string | null>(null)
  const queryClient = useQueryClient()

  // 댓글 수정을 위한 useMutation
  // 쿼리 무효화 작업이 완료된 후 페이지를 이동하기 위해 async await 를 사용하여 기다림
  const uploadPatchMutation = useMutation({
    mutationFn: () => patchComments({ id, content: comment }),
    onSuccess: async () => {
      try {
        await queryClient.invalidateQueries({ queryKey: ['articleDetailComments', dataId, currentPage] })
      } catch (e) {
        console.error(e)
      }
    },
  })

  // 댓글 유효성 검사
  const validateComment = (comment: string | undefined) => {
    if (!comment) {
      setCommentError('댓글을 입력해주세요.')
      return false
    }
    if (comment.length > 300) {
      setCommentError('댓글은 300자 미만이어야 합니다.')
      return false
    }
    setCommentError(null)
    return true
  }

  // 댓글 내용이 변경될 때 유효성 검사를 실시하기 위한 이벤트 핸들러
  const handleCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newComment = e.target.value
    setComment(newComment)
    validateComment(newComment)
  }

  // 댓글 수정 값을 전송하기 위한 이벤트 핸들러
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (!validateComment(comment)) {
      return
    }

    uploadPatchMutation.mutate()
    onClick()
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
              <DetailPostCommentSection
                comment={comment}
                setComment={handleCommentChange}
                type="modal"
                value="댓글 수정"
                commentError={commentError}
              />
            </form>
          </div>
        </Modal>
      )}
    </div>
  )
}
