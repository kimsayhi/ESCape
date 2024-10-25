import React, { useState, useEffect } from 'react'
import SortDropdown from './SortDropdown'
import StarRating from './StarRating'
import axios from 'axios'
import { ProductReviewListTypes } from '@/dtos/ProductDto'
import DefaultImage from '@images/default-image.png'
import { FaThumbsUp } from 'react-icons/fa'

const ProductReviewList: React.FC<{ productId: number; teamId: string }> = ({ productId, teamId }) => {
  const [reviews, setReviews] = useState<ProductReviewListTypes[]>([]) // 상태에 ReviewListTypes 타입 사용
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

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

  return (
    <div className={'mx-auto max-w-[940px]'}>
      <div className="mb-[30px] flex items-center justify-between">
        <h3 className={'text-lg font-semibold text-brand-white'}>{'상품 통계'}</h3>
        <SortDropdown productId={productId} teamId={teamId} order={handleSortChange} />
      </div>

      {loading ? (
        <p>로딩 중...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {reviews.map((review) => (
            <li key={review.id} className="relative mb-4 rounded-lg bg-gray-800 p-6">
              <div className="flex justify-between">
                {/* 왼쪽 영역 - 사용자 정보 */}
                <div className="flex items-start">
                  <img
                    src={review.user.image || DefaultImage.src} // 이미지가 없을 경우 기본 이미지 사용
                    alt={review.user.nickname}
                    className="mr-4 h-12 w-12 rounded-full object-cover"
                  />

                  {/* 사용자 이름 및 별점 */}
                  <div className="flex flex-col">
                    <p className="font-bold text-white">{review.user.nickname}</p>
                    <StarRating rating={Number(review.rating)} color="#FFD700" />
                  </div>
                </div>

                {/* 가운데 영역 - 리뷰 텍스트, 이미지, 작성 날짜 */}
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
                    <FaThumbsUp className="text-blue-500" />
                    <span className="font-semibold text-blue-500">{review.likeCount}</span>
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
