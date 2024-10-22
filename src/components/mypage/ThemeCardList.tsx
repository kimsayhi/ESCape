import React from 'react'
import ThemeCard from '../@shared/themeCard/ThemeCard'
import { ProductDetailTypes } from '@/dtos/ProductDto'

export default function ThemeCardList() {
  const themeList: ProductDetailTypes[] = []

  return (
    <section>
      <h3 className="mb-[30px] text-lg font-semibold text-brand-white">리뷰 남긴 상품</h3>
      <div className="grid grid-cols-2 gap-[15px] xl:grid-cols-3 xl:gap-5">
        {themeList.map((theme) => (
          <ThemeCard data={theme} />
        ))}
      </div>
    </section>
  )
}
