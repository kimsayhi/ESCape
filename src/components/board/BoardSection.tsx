import Dropdown from '@/components/board/DropDown'
import Image from 'next/image'
import ToggleIcon from '@icons/toggle_icon.svg'
import { useState } from 'react'
import BoardCard from '@/components/board/BoardCard'
import { Article } from '@/dtos/ArticleDto'

interface BoardSectionProps {
  data: Article[] | undefined
  selectedOption: string
  setSelectedOption: (option: string) => void
  userId: number
  reFetch: () => void
}

export default function BoardSection({ data, selectedOption, setSelectedOption, userId, reFetch }: BoardSectionProps) {
  const [localSelectedOption, setLocalSelectedOptions] = useState(selectedOption)

  // 드롭다운의 최신순, 인기순을 눌렀을 때 실제로 보이는 값을 수정하기 위한 이벤트 핸들러
  const handleOptionChange = (option: string) => {
    setLocalSelectedOptions(option)
    setSelectedOption(option)
  }

  return (
    <>
      <div className="mt-10 flex items-center justify-between">
        <h2 className="text-[20px] font-bold leading-6 text-brand-white">게시글</h2>
        <Dropdown
          width="w-[120px]"
          buttonChildren={
            <div className="flex w-[120px] items-center justify-between rounded-xl border-[1px] border-solid border-brand-black-light bg-brand-black-medium px-[14px] py-2.5 text-brand-white">
              {localSelectedOption}
              <Image src={ToggleIcon} alt="메뉴 열기" />
            </div>
          }
        >
          <button type="button" onClick={() => handleOptionChange('최신순')}>
            최신순
          </button>
          <button type="button" onClick={() => handleOptionChange('인기순')}>
            인기순
          </button>
        </Dropdown>
      </div>
      <div className="relative grid grid-cols-1 gap-4 py-9 xl:grid-cols-2">
        {data && data.length > 0 ? (
          data?.map(data => <BoardCard key={data.id} article={data} userId={userId} reFetch={reFetch} />)
        ) : (
          // 임시 예외 처리
          <div className="text-brand-white">내용이 없습니다.</div>
        )}
      </div>
    </>
  )
}
