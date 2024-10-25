import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import SortDropdown from './SortDropdown'
import StarRating from './StarRating'
import axios from 'axios'
import { ProductReviewListTypes } from '@/dtos/ProductDto'
import DefaultImage from '@images/default-image.png'
import ReviewLikeButton from './ReviewLikeButton'

const ProductReviewList: React.FC<{ productId: number; teamId: string }> = ({ productId, teamId }) => {
  const [reviews, setReviews] = useState<ProductReviewListTypes[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const router = useRouter()

  const fetchReviews = async (sortOption: string) => {
    setLoading(true)
    setError(null)

    try {
      // API 요청에 productId, teamId, order를 포함하여 GET 요청
      const response = await axios.get(`https://mogazoa-api.vercel.app/${teamId}/products/${productId}/reviews`, {
        params: {
          order: sortOption,
        },
      })

      // 리뷰 리스트 데이터를 추출하여 상태로 저장
      setReviews(response.data.list) // response.data.list가 실제 리뷰 배열
    } catch (err) {
      setError('리뷰 데이터를 불러오는 중 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchReviews('recent') // 기본적으로 최신순으로 리뷰 데이터를 가져옴
  }, [productId, teamId])

  const handleSortChange = (sortOption: string) => {
    fetchReviews(sortOption) // 정렬 옵션 변경 시 API 호출
  }

  // 사용자 프로필 사진 클릭 시 /user/{userId}로 이동
  const handleProfileClick = (userId: number) => {
    router.push(`/user/${userId}`) // 해당 유저의 프로필 페이지로 이동
  }

  return (
    <div className={'relative z-0 mx-auto max-w-[940px]'}>
      <div className="mb-[30px] flex items-center justify-between">
        <h3 className={'text-lg font-semibold'}>{'상품 리뷰'}</h3>
        <SortDropdown productId={productId} teamId={teamId} order={handleSortChange} />
      </div>
      {loading ? (
        <p>로딩 중...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {reviews.map((review) => (
            <li key={review.id} className="relative mb-4 rounded-lg border border-unactive bg-[#252530] p-6">
              <div className="flex justify-between">
                {/* 왼쪽 영역 - 사용자 정보 */}
                <div className="flex items-start">
                  <img
                    src={review.user.image || DefaultImage.src}
                    alt={review.user.nickname}
                    className={`mr-4 h-12 w-12 cursor-pointer rounded-full object-cover ${
                      review.user.image ? '' : 'border-2 border-unactive'
                    }`}
                    onClick={() => handleProfileClick(review.user.id)}
                    onError={(e) => {
                      e.currentTarget.src = DefaultImage.src
                      e.currentTarget.classList.add('border-2', 'border-unactive')
                    }}
                  />

                  {/* 사용자 이름 및 별점 */}
                  <div className="flex w-[120px] flex-col">
                    <p className="truncate font-bold text-white">{review.user.nickname}</p>
                    <StarRating rating={Number(review.rating)} color="#FFD700" />
                  </div>
                </div>

                <div className="mx-8 flex flex-grow flex-col">
                  {/* 리뷰 텍스트 */}
                  <p className="mb-3 text-white">{review.content}</p>

                  {/* 리뷰 이미지 */}
                  <div className="mb-2 flex space-x-2">
                    {review.reviewImages.map((image) => (
                      <img
                        key={image.id}
                        src={image.source}
                        alt={`Review Image ${image.id}`}
                        className="h-16 w-16 rounded object-cover"
                        onError={(e) => {
                          e.currentTarget.src = DefaultImage.src
                        }}
                      />
                    ))}
                  </div>

                  {/* 작성 날짜 */}
                  <p className="text-gray-400">{new Date(review.createdAt).toLocaleDateString()}</p>
                </div>

                {/* 오른쪽 영역 - 좋아요 */}
                <div className="flex flex-col items-end">
                  <div className="mt-auto flex items-center space-x-1">
                    <ReviewLikeButton
                      reviewId={review.id}
                      teamId={teamId}
                      initialIsLiked={review.isLiked}
                      initialLikeCount={review.likeCount}
                    />
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default ProductReviewList
