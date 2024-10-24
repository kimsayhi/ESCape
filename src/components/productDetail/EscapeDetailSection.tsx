import Image from 'next/image'
import { useEffect, useState } from 'react'
import FeatureTag from './FeatureTag'
import { IoChatbubbleSharp } from 'react-icons/io5'
import { IoMdShare } from 'react-icons/io'
import { FaRegHeart, FaHeart } from 'react-icons/fa'
import CustomButton from '../@shared/button/CustomButton'
//import EscapePoster from '@images/temp5_image_Escape.png'
import EscapePoster from '@images/temp4_Image_Escape.jpg'

const EscapeDetailSection: React.FC = () => {
  const [FeatureTags] = useState([
    { label: '지역', value: '강남' },
    { label: '시간', value: '60 min' },
    { label: '난이도', value: 5, isStarRating: true },
    { label: '공포도', value: 4, isStarRating: true },
    { label: '활동성', value: 3, isStarRating: true },
  ])
  const [viewCount, setViewCount] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(true) // 로그인 여부 상태, 실제 구현 시 변경 필요

  useEffect(() => {
    // 화면에 접근할 때마다 조회수 증가
    setViewCount((prev) => prev + 1)
  }, [])

  const handleFavoriteClick = () => {
    if (!isLoggedIn) {
      alert('로그인이 필요합니다.')
      return
    }
    setIsFavorite((prev) => !prev)
  }

  const handleShareClick = () => {
    const shareUrl = window.location.href
    navigator.clipboard.writeText(shareUrl)
    alert('링크가 클립보드에 복사되었습니다.')
  }

  const handleReviewClick = () => {
    if (!isLoggedIn) {
      alert('로그인이 필요합니다.')
      return
    }
    alert('리뷰 작성 모달이 나타납니다.')
  }

  const handleKakaoShare = () => {
    alert('카카오톡 공유 기능이 호출되었습니다.')
    // 카카오톡 공유 기능 구현 부분
  }

  return (
    <div className="mx-auto flex max-w-[940px] flex-col rounded-md pt-6 text-white lg:flex-row">
      <div className="mb-4 flex-shrink-0 lg:mb-0 lg:mr-6">
        <Image src={EscapePoster} alt="콜러 포스터" className="h-48 w-48 rounded-md object-fill" />
      </div>

      {/* Escape Information */}
      <div className="flex w-full flex-col justify-between">
        {/* Escape Title and Favorite Button */}
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center">
            <h2 className="text-2xl font-bold">콜러</h2>
            <button
              onClick={handleFavoriteClick}
              className="ml-4 flex items-center justify-center rounded-lg text-red-500 hover:text-red-600"
            >
              {isFavorite ? <FaHeart size={24} /> : <FaRegHeart size={24} />}
            </button>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={handleKakaoShare}
              className="flex items-center justify-center rounded-lg border-unactive bg-[#252530] p-2 text-[#6E6E82] hover:bg-[#252530] hover:text-white"
            >
              <IoChatbubbleSharp size={24} />
            </button>
            <button
              onClick={handleShareClick}
              className="flex items-center justify-center rounded-lg border-unactive bg-[#252530] p-2 text-[#6E6E82] hover:bg-[#252530] hover:text-white"
            >
              <IoMdShare size={24} />
            </button>
          </div>
        </div>

        {/* Escape Location */}
        <p className="mb-2 text-lg text-[#A0A0A0]">제로월드 강남점</p>

        {/* Escape Description */}
        <div className="mb-4">
          <p className="text-white">
            우연히 당신의 손에 들어온 초대장!
            <br />
            그것은 마녀의 집으로 들어갈 수 있는 비밀의 초대장이었다!
            <br />
            호기심을 갖고 마녀의 집으로 들어간 순간, 문은 굳게 닫혀버렸다.
            <br />
            집을 둘러보던 중, 마녀의 비밀을 알게 되는데..
            <br />이 초대장은 어떻게 당신에게 오게 되었을까?
            <br />
            과연 당신은 마녀의 집에서 탈출할 수 있을까?
          </p>
        </div>

        {/* FeatureTags */}
        <div className="mb-4 flex flex-wrap gap-4">
          {FeatureTags.map((tag, index) => (
            <FeatureTag key={index} label={tag.label} value={tag.value} isStarRating={tag.isStarRating} />
          ))}
        </div>

        {/* Buttons */}
        <div className="flex space-x-4">
          <CustomButton active={true} onClick={handleReviewClick} style="primary">
            리뷰 작성하기
          </CustomButton>
          <CustomButton active={true} onClick={() => alert('예약하기 클릭')} style="secondary">
            예약하기
          </CustomButton>
        </div>
      </div>
    </div>
  )
}

export default EscapeDetailSection
