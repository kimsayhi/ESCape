import React, { useState } from 'react'
import ThemeCard from '../@shared/themeCard/ThemeCard'
import { ProductDetailTypes } from '@/dtos/ProductDto'
import { useQuery } from '@tanstack/react-query'
import { getUserProducts } from '@/libs/axios/mypage/apis'
import { UserTypes } from '@/dtos/UserDto'
import { Spinner } from 'flowbite-react'

interface ThemeCardListProps {
  data: UserTypes
}

export default function ThemeCardList({ data }: ThemeCardListProps) {
  const [activeMenu, setActiveMenu] = useState<number>(0)
  const themeMenuContents = [
    {
      id: 0,
      title: '리뷰 남긴 테마',
      type: 'reviewed',
    },
    {
      id: 1,
      title: '좋아요 누른 테마',
      type: 'favorite',
    },
  ]
  const {
    isPending,
    isError,
    data: themeList,
  } = useQuery({
    queryKey: ['themeType', themeMenuContents[activeMenu].type],
    queryFn: () => getUserProducts({ userId: data.id, type: themeMenuContents[activeMenu].type }),
    enabled: !!data.id,
  })

  const handleThemeMenuClicked = (selectedId: number) => {
    setActiveMenu(selectedId)
  }

  // if(isPending) return <Spinner aria-label='로딩 중...' size='xl' />
  // if(isError) return <p>failed..</p>

  return (
    <section>
      <div className="mb-[30px] flex items-center justify-normal gap-10">
        {themeMenuContents.map((themeMenuContent) => (
          <button
            key={themeMenuContent.id}
            className={`text-lg xl:text-xl ${activeMenu === themeMenuContent.id ? 'font-semibold text-brand-white' : 'font-normal text-brand-gray-dark'}`}
            onClick={() => handleThemeMenuClicked(themeMenuContent.id)}
          >
            {themeMenuContent.title}
          </button>
        ))}
      </div>
      {themeList && themeList.length > 0 ? (
        <div className="grid grid-cols-2 gap-[15px] xl:grid-cols-3 xl:gap-5">
          {themeList.map((theme) => (
            <ThemeCard data={theme} />
          ))}
        </div>
      ) : (
        <p>아직 {themeMenuContents[activeMenu].title}가 없습니다</p>
      )}
    </section>
  )
}
