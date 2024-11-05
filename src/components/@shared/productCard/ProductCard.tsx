import React from 'react'
import Image from 'next/image'
import starIcon from '@icons/star_icon.svg'
import commentIcon from '@icons/comment_icon.svg'
import heartIcon from '@icons/heart_icon.svg'
import { ProductTypes } from '@/dtos/ProductDto'
import Link from 'next/link'

interface ProductCardProps {
  productId: number
  data: ProductTypes
}

export default function ProductCard({ data, productId }: ProductCardProps) {
  const { image, name, rating, reviewCount, favoriteCount } = data
  const cardDetailContents = [
    {
      key: 1,
      icon: commentIcon,
      alt: '후기',
      value: reviewCount,
    },
    {
      key: 2,
      icon: heartIcon,
      alt: '좋아요',
      value: favoriteCount,
    },
    {
      key: 3,
      icon: starIcon,
      alt: '별점',
      value: rating === 0 ? rating : rating.toFixed(2),
    },
  ]

  return (
    <Link href={`/product/${productId}`} className="h-full w-full">
      <div className="flex h-full w-full flex-col items-start justify-start gap-[10px] rounded-lg border border-unactive bg-[#252530] p-[10px] md:p-[20px] xl:max-w-[300px]">
        <Image className="m-auto" src={image} alt={`${name} 이미지`} width={140} height={98} />
        <div className="flex flex-col items-start justify-start gap-[5px]">
          <h4 className="text-sm font-medium text-brand-white">{name}</h4>
          <div className="flex items-start justify-start gap-[10px]">
            {cardDetailContents.map(cardDetailContent => (
              <div key={productId * cardDetailContent.key} className="flex items-center justify-center gap-[5px]">
                <Image src={cardDetailContent.icon} alt={`${cardDetailContent.alt} 아이콘`} width={12} height={12} />
                <p className="text-xs font-light text-brand-gray-light">{cardDetailContent.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Link>
  )
}
