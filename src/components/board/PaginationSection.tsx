import BoardPaginationButton from '@/components/board/BoardPaginationButton'

interface PaginationSectionProps {
  totalPageCount: number | undefined
  currentPage: number
  onPageClick: (page: number) => void
}

export default function PaginationSection({ totalPageCount, currentPage, onPageClick }: PaginationSectionProps) {
  // 동적으로 페이지 갯수를 표현하기 위한 함수 (현재는 4개로 고정)
  const renderPagination = () => {
    const pages = []
    const totalCount = Math.ceil((totalPageCount || 1) / 4)
    for (let i = 1; i <= totalCount; i += 1) {
      pages.push(
        <BoardPaginationButton key={i} onClick={() => onPageClick(i)} isActive={currentPage === i}>
          {i}
        </BoardPaginationButton>,
      )
    }
    return pages
  }

  return (
    <div className="absolute left-1/2 inline-flex -translate-x-1/2 transform gap-4 rounded-xl border-[1px] border-solid border-brand-black-light bg-brand-black-medium p-4">
      {renderPagination()}
    </div>
  )
}
