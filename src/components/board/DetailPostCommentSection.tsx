import { ChangeEvent } from 'react'

interface DetailPostCommentSectionProps {
  comment: string | undefined
  commentError: string | null
  setComment: (e: ChangeEvent<HTMLTextAreaElement>) => void
  type?: string
  value: string
}

export default function DetailPostCommentSection({
  comment,
  commentError,
  setComment,
  type,
  value,
}: DetailPostCommentSectionProps) {
  return (
    <div
      className={`${type === 'modal' ? 'pb-[24px] md:pb-[104px]' : 'border-b-[1px] border-solid border-brand-black-light pb-[104px]'} relative`}
    >
      <h2 className="text-[20px] font-bold leading-6 text-brand-white">{value}</h2>
      <div className="relative">
        <textarea
          placeholder="댓글을 입력해주세요."
          className={`${commentError === null ? '' : 'border-red-500'} mt-6 h-[180px] w-full rounded-xl border-[1px] border-solid border-brand-black-light bg-brand-black-medium px-6 py-4 text-brand-white`}
          value={comment}
          onChange={setComment}
          maxLength={300}
        />
        <p className="absolute bottom-4 right-4 text-brand-white">{comment?.length} / 300</p>
      </div>
      {commentError && <p className="ml-4 mt-4 text-red-500">{commentError}</p>}
      <button
        type="submit"
        className={`${type === 'modal' ? 'w-full' : 'w-[184px]'} absolute right-0 mt-4 h-12 rounded-xl bg-gradation py-[14px] text-[16px] font-semibold leading-[19px] text-brand-white shadow-xl`}
      >
        등록
      </button>
    </div>
  )
}
