import React, { useState } from 'react'
import { Dropdown } from 'flowbite-react'

interface SortDropdownProps {
  productId: number
  teamId: string
  order: (sortOption: string) => void
}

const SortDropdown: React.FC<SortDropdownProps> = ({ productId, teamId, order }) => {
  // 기본값을 'recent'로 설정하여 최신순이 기본으로 보이도록 설정
  const [selectedOption, setSelectedOption] = useState('최신순')

  const handleSortChange = (sortOption: string, label: string) => {
    setSelectedOption(label) // 선택한 옵션의 라벨을 설정
    order(sortOption) // 부모 컴포넌트로 선택된 정렬 옵션을 전달
  }

  return (
    <div className="flex items-center gap-4">
      <Dropdown label={selectedOption} inline>
        {/* 기본값은 selectedOption */}
        <Dropdown.Item onClick={() => handleSortChange('recent', '최신순')}>최신순</Dropdown.Item>
        <Dropdown.Item onClick={() => handleSortChange('ratingDesc', '별점 높은순')}>별점 높은순</Dropdown.Item>
        <Dropdown.Item onClick={() => handleSortChange('ratingAsc', '별점 낮은순')}>별점 낮은순</Dropdown.Item>
        <Dropdown.Item onClick={() => handleSortChange('likeCount', '좋아요순')}>좋아요순</Dropdown.Item>
      </Dropdown>
    </div>
  )
}

export default SortDropdown
