import Image from 'next/image'
import { useQuery } from '@tanstack/react-query'
import FeatureTag from './FeatureTag'
import CustomButton from '../../@shared/button/CustomButton'
import FavoriteButton from './FavoriteButton'
import KakaoShareButton from './KakaoShareButton'
import { IoMdShare } from 'react-icons/io'
import { fetchProductDetails } from '@/libs/axios/product/productApi'
import { ProductDetailTypes, DescriptionTypes } from '@/dtos/ProductDto'

const ProductDetailSection: React.FC<{ productId: number; teamId: string }> = ({ productId, teamId }) => {
  const { data, isLoading, error } = useQuery<ProductDetailTypes>({
    queryKey: ['productDetail', productId],
    queryFn: () => fetchProductDetails(teamId, productId),
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>제품 세부 정보를 불러오지 못했습니다.</div>

  const productDetail = data as ProductDetailTypes
  const parsedDescription = productDetail?.description as DescriptionTypes

  const handleShareClick = () => {
    const shareUrl = window.location.href
    navigator.clipboard.writeText(shareUrl)
    alert('링크가 클립보드에 복사되었습니다.')
  }

  const handleReviewClick = () => {
    alert('리뷰 작성 모달이 나타납니다.')
  }

  const handleReservationClick = () => {
    if (parsedDescription?.url) {
      const userConfirmed = confirm('예약 페이지로 이동하시겠습니까?')
      if (userConfirmed) {
        window.location.href = parsedDescription.url
      }
    } else {
      alert('예약 URL을 찾을 수 없습니다.')
    }
  }

  return (
    <div className="mx-auto flex max-w-[940px] flex-col rounded-md pt-6 text-white lg:flex-row">
      <div className="mb-4 flex-shrink-0 lg:mb-0 lg:mr-6">
        <Image
          src={productDetail.image}
          width={128}
          height={128}
          alt={productDetail.name}
          className="h-48 w-48 rounded-md object-fill"
        />
      </div>

      {/* Escape 정보 */}
      <div className="flex w-full flex-col justify-between">
        {/* Escape 제목 및 찜하기 버튼 */}
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center">
            <h2 className="text-2xl font-bold">{productDetail.name}</h2>
            <FavoriteButton productId={productId} teamId={teamId} isFavorite={productDetail.isFavorite} />
          </div>
          <div className="flex space-x-4">
            <KakaoShareButton
              url={window.location.href} // 공유할 URL
              title={productDetail.name} // 공유할 제목
              description={parsedDescription.des} // 공유할 설명
              imageUrl={productDetail.image} // 공유할 이미지 URL
            />
            <button
              onClick={handleShareClick}
              className="flex items-center justify-center rounded-lg border-unactive bg-[#252530] p-2 text-[#6E6E82] hover:bg-[#252530] hover:text-white"
            >
              <IoMdShare size={24} />
            </button>
          </div>
        </div>

        {/* Escape 위치 */}
        <p className="mb-2 text-lg text-[#A0A0A0]">{`${parsedDescription.spot}`}</p>

        {/* Escape 설명 */}
        <div className="mb-4">
          <p className="text-white">{parsedDescription.des}</p>
        </div>

        {/* FeatureTags */}
        <div className="mb-4 flex flex-wrap gap-2">
          <FeatureTag label="지역" value={parsedDescription.loc} />
          <FeatureTag label="난이도" value={parsedDescription.lev} isStarRating={true} />
          <FeatureTag label="시간" value={`${parsedDescription.time} min`} />
          <FeatureTag label="공포도" value={parsedDescription.hor} isStarRating={true} />
          <FeatureTag label="활동성" value={parsedDescription.act} isStarRating={true} />
        </div>

        {/* 버튼들 */}
        <div className="flex space-x-4">
          <CustomButton active={true} onClick={handleReviewClick} style="primary">
            리뷰 작성하기
          </CustomButton>
          <CustomButton active={true} onClick={handleReservationClick} style="secondary">
            예약하기
          </CustomButton>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailSection
