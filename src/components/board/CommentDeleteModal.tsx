import Modal from '@/components/@shared/modal/Modal'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteComments } from '@/libs/axios/board/deleteComments'

export interface CommentDeleteModalProps {
  id: number | undefined
  isOpen: boolean
  onClick: () => void
  currentPage: number
  dataId: string | string[] | undefined
}

export default function CommentDeleteModal({ id, isOpen, onClick, currentPage, dataId }: CommentDeleteModalProps) {
  const queryClient = useQueryClient()

  // 댓글 삭제를 위한 deleteMutation
  // 댓글 삭제 성공 후, 댓글의 쿼리를 다시 불러와서 화면을 재렌더링
  const deleteMutation = useMutation({
    mutationFn: () => deleteComments(id),
    onSuccess: async () => {
      try {
        await queryClient.invalidateQueries({ queryKey: ['articleDetailComments', dataId, currentPage] })
        await queryClient.invalidateQueries({ queryKey: ['articleDetail', dataId] })
      } catch (e) {
        console.error(e)
      }
    },
  })

  // 댓글 삭제를 전달하기 위한 이벤트 핸들러
  const handleSubmit = () => {
    deleteMutation.mutate()
    onClick()
  }

  return (
    <div>
      {isOpen && (
        <Modal onClick={onClick} modalFrameClassNames="">
          <form onSubmit={handleSubmit}>
            <div className="px-4 pt-4">
              <p className="text-[20px] font-bold leading-6 text-brand-white">댓글을 삭제하시겠습니까?</p>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <button
                  type="submit"
                  className="rounded-xl border-[1px] border-solid border-brand-black-light py-4 hover:bg-brand-black-dark"
                >
                  예
                </button>
                <button
                  type="button"
                  onClick={onClick}
                  className="rounded-xl border-[1px] border-solid border-brand-black-light py-4 hover:bg-brand-black-dark"
                >
                  아니오
                </button>
              </div>
            </div>
          </form>
        </Modal>
      )}
    </div>
  )
}
