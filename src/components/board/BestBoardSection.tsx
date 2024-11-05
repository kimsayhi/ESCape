import BestBoardCard from '@/components/board/BestBoardCard'
import { Article } from '@/dtos/ArticleDto'
import React from 'react'

interface BestBoardSectionProps {
  data: Article[] | undefined
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
  disabled: boolean
}

export default function BestBoardSection({ data, onClick, disabled }: BestBoardSectionProps) {
  return (
    <>
      <div className="mt-10 flex items-center justify-between">
        <h2 className="text-[20px] font-bold leading-6 text-brand-white">베스트 게시글</h2>
        <button
          type="button"
          className="text-[14px] font-normal leading-[17px] text-brand-gray-dark"
          onClick={onClick}
          disabled={disabled}
        >
          더보기 {'>'}
        </button>
      </div>
      <div className="relative grid grid-cols-1 gap-4 border-b-[1px] border-solid border-brand-black-light py-10 md:grid-cols-2 xl:grid-cols-3">
        {data && data.length > 0 ? (
          data?.map(data => <BestBoardCard key={data.id} like={data} />)
        ) : (
          // 임시 예외 처리
          <div className="text-brand-white">내용이 없습니다.</div>
        )}
      </div>
    </>
  )
}
