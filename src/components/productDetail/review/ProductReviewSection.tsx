import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import SortDropdown from './SortDropdown'
import StarRating from '../StarRating'
import { fetchReviews } from '@/libs/axios/product/reviewApi'
import { ProductReviewListTypes } from '@/dtos/ProductDto'
import DefaultImage from '@images/default-image.png'
import ReviewLikeButton from './ReviewLikeButton'

const ProductReviewSection: React.FC<{ productId: number; teamId: string }> = ({ productId, teamId }) => {
  const router = useRouter()
  const [sortOption, setSortOption] = React.useState<string>('recent')

  // React Query의 useQuery 훅을 사용하여 리뷰 데이터를 가져옴
  const {
    data: reviews = [],
    isLoading,
    error,
  } = useQuery<ProductReviewListTypes[]>({
    queryKey: ['reviews', productId, sortOption],
    queryFn: () => fetchReviews(teamId, productId, sortOption),
  })

  const handleSortChange = (newSortOption: string) => {
    setSortOption(newSortOption) // 정렬 옵션 변경
  }

  const handleProfileClick = (userId: number) => {
    router.push(`/user/${userId}`) // 해당 유저의 프로필 페이지로 이동
  }

  return (
    <div className={'relative z-0 mx-auto max-w-[940px]'}>
      <div className="mb-[30px] flex items-center justify-between">
        <h3 className={'text-lg font-semibold'}>{'상품 리뷰'}</h3>
        <SortDropdown productId={productId} teamId={teamId} order={handleSortChange} />
      </div>
      {isLoading ? (
        <p>로딩 중...</p>
      ) : error ? (
        // error가 존재하면 에러 메시지를 출력
        <p>{(error as Error).message}</p>
      ) : (
        <ul>
          {reviews.map((review) => (
            <li key={review.id} className="relative mb-4 rounded-lg border border-unactive bg-[#252530] p-6">
              <div className="flex justify-between">
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

                  <div className="flex w-[120px] flex-col">
                    <p className="truncate font-bold text-white">{review.user.nickname}</p>
                    <StarRating rating={Number(review.rating)} color="#FFD700" />
                  </div>
                </div>

                <div className="mx-8 flex flex-grow flex-col">
                  <p className="mb-3 text-white">{review.content}</p>
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
                  <p className="text-gray-400">{new Date(review.createdAt).toLocaleDateString()}</p>
                </div>

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

export default ProductReviewSection
