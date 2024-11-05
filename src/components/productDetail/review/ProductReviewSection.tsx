import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '@/contexts/AuthProvider'
import { useToaster } from '@/contexts/ToasterProvider'
import { deleteReview } from '@/libs/axios/product/reviewApi'
import { ProductReviewListTypes } from '@/dtos/ProductDto'
import { Spinner } from 'flowbite-react'
import DefaultImage from '@images/default-image.png'
import useInfiniteReviews from '@/hooks/useInfiniteReviews'
import useInfiniteScroll from '@/hooks/useInfiniteScroll'
import SortDropdown from './SortDropdown'
import StarRating from '../StarRating'
import ReviewLikeButton from './ReviewLikeButton'
import ReviewModal from '../ReviewModal'
import ConfirmModal from '../ConfirmModal'

interface ProductReviewSectionProps {
  productId: number
  sortOption: 'recent' | 'ratingDesc' | 'ratingAsc' | 'likeCount'
  onSortChange: (newSortOption: 'recent' | 'ratingDesc' | 'ratingAsc' | 'likeCount') => void
}

const ProductReviewSection: React.FC<ProductReviewSectionProps> = ({ productId, sortOption, onSortChange }) => {
  const router = useRouter()
  const toaster = useToaster()
  const { user } = useAuth()
  const [isReviewModalOpen, setIsReviewModalOpen] = useState<boolean>(false)
  const [editingReview, setEditingReview] = useState<ProductReviewListTypes | null>(null)
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false)
  const [reviewIdToDelete, setReviewIdToDelete] = useState<number | null>(null)

  // useInfiniteReviews 훅으로 무한 스크롤 데이터 로드
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } = useInfiniteReviews(productId, {
    order: sortOption,
  })

  // sortOption 변경 시 refetch 호출
  useEffect(() => {
    refetch()
  }, [sortOption, refetch])

  // useInfiniteScroll 훅으로 스크롤 이벤트 관리
  const { targetRef } = useInfiniteScroll({
    loadMore: fetchNextPage,
    hasMore: hasNextPage || false,
  })

  const handleProfileClick = (userId: number) => {
    router.push(`/user/${userId}`)
  }

  const handleEditReview = (review: ProductReviewListTypes) => {
    setEditingReview(review)
    setIsReviewModalOpen(true)
  }

  const handleDeleteReview = (reviewId: number) => {
    setReviewIdToDelete(reviewId)
    setShowConfirmModal(true)
  }

  const confirmDelete = async () => {
    if (reviewIdToDelete !== null) {
      try {
        await deleteReview(reviewIdToDelete)
        toaster('success', '리뷰가 성공적으로 삭제되었습니다.')
        refetch()
      } catch (error) {
        console.error('리뷰 삭제 실패:', error)
        toaster('fail', '리뷰 삭제에 실패했습니다.')
      } finally {
        setShowConfirmModal(false)
        setReviewIdToDelete(null)
      }
    }
  }

  const cancelDelete = () => {
    setShowConfirmModal(false)
    setReviewIdToDelete(null)
  }

  const closeModal = () => {
    setIsReviewModalOpen(false)
    setEditingReview(null)
    refetch()
  }

  return (
    <div className="relative mx-auto max-w-[940px]">
      <div className="mb-[30px] flex items-center justify-between">
        <h3 className="text-lg font-semibold">상품 리뷰</h3>
        <SortDropdown order={onSortChange} currentSortOption={sortOption} />
      </div>

      {data?.pages && data.pages.length === 0 ? (
        <p>리뷰가 없습니다.</p>
      ) : (
        <ul>
          {data?.pages.map(page =>
            page.list.map(review => (
              <li key={review.id} className="relative mb-4 rounded-lg border border-unactive bg-[#252530] p-6">
                <div className="md:flex md:justify-between">
                  <section className="mb-4 md:mb-0">
                    <div className="flex items-start">
                      <button
                        type="button"
                        onClick={() => handleProfileClick(review.user.id)}
                        className="mr-4 h-12 w-12 cursor-pointer overflow-hidden rounded-full object-cover focus:outline-none"
                        aria-label={`${review.user.nickname}의 프로필`}
                      >
                        <img
                          src={review.user.image || DefaultImage.src}
                          alt={review.user.nickname}
                          className={`h-full w-full object-cover ${review.user.image ? '' : 'border-2 border-unactive'}`}
                          onError={e => {
                            e.currentTarget.src = DefaultImage.src
                            e.currentTarget.classList.add('border-2', 'border-unactive')
                          }}
                        />
                      </button>

                      <div className="flex w-[120px] flex-col">
                        <p className="truncate font-bold text-white">{review.user.nickname}</p>
                        <StarRating rating={Number(review.rating)} color="#FFD700" />
                      </div>
                    </div>
                  </section>

                  <div className="space-y-2 md:mx-8 md:flex md:flex-grow md:flex-col">
                    <p className="text-white">{review.content}</p>
                    <div className="flex space-x-2">
                      {review.reviewImages.map(image => (
                        <img
                          key={image.id}
                          src={image.source}
                          alt={`Review_Image ${image.id}`}
                          className="h-16 w-16 rounded object-cover"
                          onError={e => {
                            e.currentTarget.src = DefaultImage.src
                          }}
                        />
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-gray-400">
                        <p>{new Date(review.createdAt).toLocaleDateString()}</p>
                        {user && user.id === review.user.id && (
                          <div className="flex space-x-2">
                            <button
                              type="button"
                              className="text-[#9FA6B2] hover:underline"
                              onClick={() => handleEditReview(review)}
                            >
                              수정
                            </button>
                            <button
                              type="button"
                              className="text-[#9FA6B2] hover:underline"
                              onClick={() => handleDeleteReview(review.id)}
                            >
                              삭제
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end">
                    <div className="mt-auto flex items-center space-x-1">
                      <ReviewLikeButton
                        reviewId={review.id}
                        initialIsLiked={review.isLiked}
                        initialLikeCount={review.likeCount}
                      />
                    </div>
                  </div>
                </div>
              </li>
            )),
          )}
        </ul>
      )}

      {isFetchingNextPage && (
        <div className="my-4 flex justify-center">
          <Spinner size="lg" aria-label="Loading" />
        </div>
      )}

      {/* 무한 스크롤의 관찰 지점으로 사용될 targetRef */}
      <div ref={targetRef} />

      {editingReview && (
        <ReviewModal
          isOpen={isReviewModalOpen}
          onClose={closeModal}
          productName="상품 이름"
          productId={productId}
          isEdit
          initialReviewData={{
            rating: editingReview.rating,
            content: editingReview.content,
            images: editingReview.reviewImages.map(image => ({
              id: image.id,
              source: image.source,
            })),
            reviewId: editingReview.id,
          }}
        />
      )}

      {/* ConfirmModal 표시 */}
      {showConfirmModal && (
        <ConfirmModal
          title="리뷰 삭제"
          description="리뷰를 삭제하시겠습니까?"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  )
}

export default ProductReviewSection
