import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import { IoMdShare } from 'react-icons/io'
import { useAuth } from '@/contexts/AuthProvider'
import { useToaster } from '@/contexts/ToasterProvider'
import { ProductDetailTypes, DescriptionTypes } from '@/dtos/ProductDto'
import FeatureTag from './FeatureTag'
import CustomButton from '../../@shared/ui/CustomButton'
import FavoriteButton from './FavoriteButton'
import KakaoShareButton from './KakaoShareButton'
import ReviewModal from '../ReviewModal'

const ProductDetailSection: React.FC<{ productId: number; detailData: ProductDetailTypes }> = ({
  productId,
  detailData,
}) => {
  const queryClient = useQueryClient()
  const { user } = useAuth()
  const toaster = useToaster()
  const [isModalOpen, setModalOpen] = useState(false)

  const parsedDescription = detailData?.description as DescriptionTypes

  const features = [
    { label: '지역', value: parsedDescription.loc },
    { label: '시간', value: `${parsedDescription.time} min` },
    { label: '난이도', value: parsedDescription.lev, isStarRating: true },
    { label: '공포도', value: parsedDescription.hor, isStarRating: true },
    { label: '활동성', value: parsedDescription.act, isStarRating: true },
  ]

  const handleShareClick = () => {
    const shareUrl = window.location.href
    navigator.clipboard.writeText(shareUrl)
    toaster('success', '링크가 클립보드에 복사되었습니다.')
  }

  const handleReviewClick = () => {
    if (!user) {
      toaster('fail', '리뷰 작성은 로그인이 필요합니다.')
      window.location.href = '/signin'
      return
    }
    setModalOpen(true)
  }

  const handleReservationClick = () => {
    if (parsedDescription?.url) {
      window.location.href = parsedDescription.url
    } else {
      toaster('fail', '예약 URL을 찾을 수 없습니다.')
    }
  }

  const handleRefetch = () => {
    queryClient.invalidateQueries({ queryKey: ['productDetail', productId] })
  }

  return (
    <div className="mx-auto flex max-w-[940px] flex-col rounded-md pt-6 text-white lg:flex-row">
      <div className="mb-4 flex-shrink-0 lg:mb-0 lg:mr-6">
        <Image
          src={detailData.image}
          width={128}
          height={128}
          alt={detailData.name}
          className="h-48 w-48 rounded-md object-fill"
        />
      </div>

      <div className="flex w-full flex-col justify-between">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center">
            <h2 className="text-2xl font-bold">{detailData.name}</h2>
            <FavoriteButton productId={productId} isFavorite={detailData.isFavorite} onRefetch={handleRefetch} />
          </div>
          <div className="flex space-x-4">
            <KakaoShareButton
              url={window.location.href}
              title={detailData.name}
              description={parsedDescription.des}
              imageUrl={detailData.image}
            />
            <button
              type="button"
              onClick={handleShareClick}
              className="flex items-center justify-center rounded-lg border-unactive bg-[#252530] p-2 text-[#6E6E82] hover:bg-[#252530] hover:text-white"
            >
              <IoMdShare size={24} />
            </button>
          </div>
        </div>

        <p className="mb-2 text-lg text-[#A0A0A0]">{`${parsedDescription.spot}`}</p>

        <div className="mb-4">
          <p className="text-white">{parsedDescription.des}</p>
        </div>

        <div className="mb-4 flex flex-wrap gap-2">
          {features.map(feature => (
            <FeatureTag
              key={feature.label}
              label={feature.label}
              value={feature.value}
              isStarRating={feature.isStarRating}
            />
          ))}
        </div>

        <div className="flex space-x-4">
          <CustomButton active onClick={handleReviewClick} styleType="primary">
            리뷰 작성하기
          </CustomButton>
          <CustomButton active onClick={handleReservationClick} styleType="secondary">
            예약하기
          </CustomButton>
        </div>
      </div>

      {isModalOpen && (
        <ReviewModal
          isOpen={isModalOpen}
          onClose={() => {
            setModalOpen(false)
            queryClient.invalidateQueries({ queryKey: ['reviews', productId] })
          }}
          productName={detailData.name}
          productId={productId}
        />
      )}
    </div>
  )
}

export default ProductDetailSection
