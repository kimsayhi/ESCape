import { ArticleComment } from '@/dtos/ArticleDto'
import KebabIcon from '@icons/kebab_icon.svg'
import ProfileIcon from '@icons/profile_icon.svg'
import Image from 'next/image'
import timeAgo from '@/utils/timeAgo'
import Dropdown from '@/components/board/DropDown'
import { useState } from 'react'
import CommentDeleteModal from '@/components/board/CommentDeleteModal'
import CommentPatchModal from '@/components/board/CommentPatchModal'

export interface DetailCommentProps {
  data?: ArticleComment
  currentPage: number
  dataId: string | string[] | undefined
  userId: string | number | undefined
}

export default function CommentCard({ data, currentPage, dataId, userId }: DetailCommentProps) {
  const [isPatchOpen, setIsPatchOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const togglePatchModal = () => setIsPatchOpen(prevState => !prevState)
  const toggleDeleteModal = () => setIsDeleteOpen(prevState => !prevState)

  // 댓글 수정하기를 클릭할 시 수정 모달을 열어주는 이벤트 핸들러
  const handlePatchModal = () => {
    setIsPatchOpen(!isPatchOpen)
  }

  // 댓글 삭제하기를 클릭할 시 삭제 모달을 열어주는 이벤트 핸들러
  const handleDeleteModal = () => {
    setIsDeleteOpen(!isDeleteOpen)
  }

  return (
    <>
      <div className="rounded-xl border-[1px] border-solid border-brand-black-light bg-brand-black-medium px-6 py-5">
        <div className="flex justify-between">
          <p className="line-clamp-[10] break-words text-[16px] font-normal leading-[19px] text-brand-white">
            {data?.content ? data.content : '댓글이 들어가는 영역입니다.'}
          </p>
          <div>
            <Dropdown
              width="w-[120px]"
              buttonChildren={
                <div className={`${userId === data?.writer.id ? '' : 'hidden'} ml-4 h-6 w-6`}>
                  <Image src={KebabIcon} alt="수정 & 삭제하기" width={24} height={24} />
                </div>
              }
            >
              <button type="button" onClick={handlePatchModal}>
                수정하기
              </button>
              <button type="button" onClick={handleDeleteModal}>
                삭제하기
              </button>
            </Dropdown>
          </div>
        </div>
        <div className="mt-12 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              className="h-8 w-8 rounded-full"
              src={data?.writer.image && data?.writer.image !== 'null' ? data.writer.image : ProfileIcon}
              alt="작성자 이미지"
              width={32}
              height={32}
            />
            <p className="line-clamp-1 max-w-[260px] break-words pr-1 text-[14px] font-medium leading-[17px] text-brand-white">
              {data?.writer.nickname ? data.writer.nickname : '알 수 없음'}
            </p>
            <p className="border-l-[1px] border-solid border-brand-black-light pl-4 text-[14px] font-medium leading-[17px] text-brand-gray-dark">
              {timeAgo(data?.createdAt)}
            </p>
          </div>
        </div>
      </div>
      <CommentPatchModal
        id={data?.id}
        content={data?.content}
        isOpen={isPatchOpen}
        onClick={togglePatchModal}
        currentPage={currentPage}
        dataId={dataId}
      />
      <CommentDeleteModal
        id={data?.id}
        isOpen={isDeleteOpen}
        onClick={toggleDeleteModal}
        currentPage={currentPage}
        dataId={dataId}
      />
    </>
  )
}
