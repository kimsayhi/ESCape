import { ArticleDetail } from '@/dtos/ArticleDto'
import Dropdown from '@/components/board/DropDown'
import Image from 'next/image'
import KebabIcon from '@icons/kebab_icon.svg'
import CommentIcon from '@icons/board_comment_icon.svg'
import HeartIcon from '@icons/board_heart_icon.svg'
import timeAgo from '@/utils/timeAgo'
import BoardPatchModal from '@/components/board/BoardPatchModal'
import BoardDeleteModal from '@/components/board/BoardDeleteModal'
import { useState } from 'react'
import { postLike } from '@/libs/axios/board/postLike'
import { deleteLike } from '@/libs/axios/board/deleteLike'
import LikeIcon from '@icons/like_icon.svg'
import UnLikeIcon from '@icons/unlike_icon.svg'

export interface DetailContentProps {
  data?: ArticleDetail
  userId: string | number | undefined
  reFetch: () => void
}

export default function DetailContentSection({ data, userId, reFetch }: DetailContentProps) {
  const [isPatchOpen, setIsPatchOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const togglePatchModal = () => setIsPatchOpen(prevState => !prevState)
  const toggleDeleteModal = () => setIsDeleteOpen(prevState => !prevState)

  // 상세페이지 게시물 수정하기를 클릭할 시 수정 모달을 열어주는 이벤트 핸들러
  const handlePatchModal = () => {
    setIsPatchOpen(!isPatchOpen)
  }

  // 상세페이지 게시물 삭제하기를 클릭할 시 삭제 모달을 열어주는 이벤트 핸들러
  const handleDeleteModal = () => {
    setIsDeleteOpen(!isDeleteOpen)
  }

  // 게시글에 좋아요를 하기 위한 이벤트 핸들러
  const handleLikeToggle = async () => {
    try {
      if (!data?.isLiked) {
        await postLike({ id: String(data?.id), userId })
      } else {
        await deleteLike({ id: String(data.id), userId })
      }
    } catch (error) {
      console.error('찜하기 처리 중 오류가 발생했습니다.', error)
    } finally {
      reFetch()
    }
  }

  return (
    <>
      <div className="flex items-center justify-between border-b-[1px] border-solid border-brand-black-light pb-6">
        <h1 className="break-words text-[18px] font-medium leading-[21px] text-brand-white">
          {data?.title ? data.title : '제목이 들어가는 영역입니다.'}
        </h1>
        {userId === data?.writer.id ? (
          <Dropdown
            width="w-[120px]"
            buttonChildren={
              <div className="ml-4 h-6 w-6">
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
        ) : (
          <div>
            <button className="flex h-6 w-6 items-center justify-center" type="button" onClick={handleLikeToggle}>
              {data?.isLiked ? (
                <Image src={LikeIcon} alt="좋아요" width={24} height={24} />
              ) : (
                <Image src={UnLikeIcon} alt="안 좋아요" width={24} height={24} />
              )}
            </button>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between pt-6">
        <div className="flex">
          <p className="pr-4 text-[14px] font-medium leading-[17px] text-brand-white">
            {data?.writer.nickname ? data.writer.nickname : '알 수 없음'}
          </p>
          <p className="border-l-[1px] border-solid border-brand-black-light pl-4 text-[14px] font-medium leading-[17px] text-brand-gray-dark">
            {timeAgo(data?.createdAt)}
          </p>
        </div>
        <div className="flex">
          <Image src={CommentIcon} alt="리뷰 갯수" />
          <p className="pl-2 pr-4 text-[14px] font-medium leading-[17px] text-brand-white">
            {data?.commentCount ? data.commentCount : '0'}
          </p>
          <Image src={HeartIcon} alt="좋아요 갯수" />
          <p className="pl-2 pr-4 text-[14px] font-medium leading-[17px] text-brand-white">
            {data?.likeCount ? data.likeCount : '0'}
          </p>
        </div>
      </div>
      <div className="py-20">
        {data?.imageIdList.length !== 0 ? (
          <Image
            src={`${process.env.NEXT_PUBLIC_BOARD_API_URL}/images/${data?.imageIdList.at(-1)}`}
            alt="게시물 이미지"
            width={320}
            height={320}
            className="mb-4"
          />
        ) : null}
        <p className="text-[16px] font-medium leading-[28px] text-brand-white">
          {data?.content ? data.content : '본문이 들어가는 영역입니다.'}
        </p>
      </div>
      <BoardPatchModal id={data?.id} isOpen={isPatchOpen} onClick={togglePatchModal} value="게시글 수정" />
      <BoardDeleteModal id={data?.id} isOpen={isDeleteOpen} onClick={toggleDeleteModal} />
    </>
  )
}
