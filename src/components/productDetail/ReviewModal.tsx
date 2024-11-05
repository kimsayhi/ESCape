import React, { useEffect, useState } from 'react'
import Modal from '@/components/@shared/modal/Modal'
import { FaStar } from 'react-icons/fa'
import { createReview, updateReview, uploadImage } from '@/libs/axios/product/reviewApi'
import DefaultImage from '@images/default-image.png'
import { IoMdCloseCircle } from 'react-icons/io'
import { CreateReviewRequestBody, UpdateReviewRequestBody, ReviewImage } from '@/dtos/ReviewDto'
import { useToaster } from '@/contexts/ToasterProvider'
import { useQueryClient } from '@tanstack/react-query'

interface ReviewModalProps {
  isOpen: boolean
  onClose: () => void
  productName: string
  productId: number
  isEdit?: boolean
  initialReviewData?: { rating: number; content: string; images: ReviewImage[]; reviewId?: number }
}

const MAX_CHAR_COUNT = 500
const MAX_IMAGE_COUNT = 3

const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  onClose,
  productName,
  productId,
  isEdit = false,
  initialReviewData = { rating: 0, content: '', images: [] },
}) => {
  const [rating, setRating] = useState<number>(initialReviewData.rating)
  const [reviewText, setReviewText] = useState<string>(initialReviewData.content)
  const [imageFiles, setImageFiles] = useState<File[]>([])
  const [uploadedImageUrls, setUploadedImageUrls] = useState<string[]>(
    initialReviewData.images.filter(image => !image.id).map(image => image.source as string),
  )
  const [existingImages, setExistingImages] = useState<ReviewImage[]>(
    initialReviewData.images.filter(image => image.id),
  )
  const [loading, setLoading] = useState<boolean>(false)
  const toaster = useToaster()
  const queryClient = useQueryClient() // queryClient 추가

  useEffect(() => {
    if (isOpen && isEdit) {
      setRating(initialReviewData.rating)
      setReviewText(initialReviewData.content)
      setUploadedImageUrls(initialReviewData.images.filter(image => !image.id).map(image => image.source as string))
      setExistingImages(initialReviewData.images.filter(image => image.id))
    }
  }, [isOpen, isEdit, initialReviewData])

  const validateForm = () => {
    if (rating === 0) {
      toaster('warn', '별점을 선택해 주세요.')
      return false
    }
    if (reviewText.trim() === '') {
      toaster('warn', '리뷰 내용을 입력해 주세요.')
      return false
    }
    return true
  }

  const handleRatingClick = (value: number) => setRating(value)

  const handleReviewTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= MAX_CHAR_COUNT) {
      setReviewText(e.target.value)
    }
  }

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files)

      if (imageFiles.length + newFiles.length <= MAX_IMAGE_COUNT) {
        setImageFiles([...imageFiles, ...newFiles])

        const uploadedUrls = await Promise.all(newFiles.map(file => uploadImage(file)))
        setUploadedImageUrls(prevUrls => [...prevUrls, ...uploadedUrls])
      } else {
        toaster('warn', `이미지는 최대 ${MAX_IMAGE_COUNT}개까지만 업로드할 수 있습니다.`)
      }
    }
  }

  const handleImageRemove = (identifier: number | string | undefined) => {
    if (identifier !== undefined) {
      if (typeof identifier === 'number') {
        setExistingImages(existingImages.filter(image => image.id !== identifier))
      } else {
        setUploadedImageUrls(uploadedImageUrls.filter(url => url !== identifier))
        const index = uploadedImageUrls.findIndex(url => url === identifier)
        setImageFiles(imageFiles.filter((_, i) => i !== index))
      }
    }
  }

  const handleSubmit = async () => {
    // 유효성 검사를 먼저 실행
    if (!validateForm()) return

    setLoading(true)
    try {
      const imagePayload: ReviewImage[] = [
        ...existingImages.map(image => ({ id: image.id })),
        ...uploadedImageUrls.map(url => ({ source: url })),
      ]

      if (isEdit && initialReviewData.reviewId) {
        const payload: UpdateReviewRequestBody = {
          images: imagePayload,
          content: reviewText,
          rating,
        }

        console.log('수정할 데이터:', payload)
        await updateReview(initialReviewData.reviewId, payload)
        toaster('success', '리뷰가 성공적으로 수정되었습니다.')
      } else {
        const payload: CreateReviewRequestBody = {
          productId,
          images: imagePayload.map(img => img.source || img.id).filter((url): url is string => typeof url === 'string'),
          content: reviewText,
          rating,
        }

        console.log('생성할 데이터:', payload)
        await createReview(payload)
        toaster('success', '리뷰가 성공적으로 등록되었습니다.')
      }

      // 리뷰 생성 및 수정 시 데이터 새로고침
      queryClient.invalidateQueries({ queryKey: ['productDetail', productId] })
      queryClient.invalidateQueries({ queryKey: ['productStatistics', productId] }) // statsic refetch

      onClose()
    } catch (error) {
      console.error(isEdit ? '리뷰 수정 실패:' : '리뷰 등록 실패:', error)
      toaster('fail', isEdit ? '리뷰 수정에 실패했습니다.' : '리뷰 등록에 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <Modal onClick={onClose}>
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-white">{productName}</h2>
        <div className="flex space-x-2">
          {[1, 2, 3, 4, 5].map(star => (
            <FaStar
              key={star}
              size={24}
              className={star <= rating ? 'text-yellow-400' : 'text-gray-400'}
              onClick={() => handleRatingClick(star)}
              cursor="pointer"
            />
          ))}
        </div>
        <div className="flex w-[290px] flex-col gap-5 md:w-[540px]">
          <div className="relative rounded-lg bg-[#252530]">
            <textarea
              value={reviewText}
              onChange={handleReviewTextChange}
              className="w-full rounded-lg border border-gray-600 bg-transparent p-3"
              rows={5}
              placeholder="리뷰를 작성해 주세요"
            />
            <p className="absolute bottom-2 right-3 text-sm text-[#6E6E82]">
              {reviewText.length}/{MAX_CHAR_COUNT}
            </p>
          </div>

          <div className="flex items-center space-x-2 overflow-x-auto whitespace-nowrap">
            <div className="inline-flex space-x-2">
              {uploadedImageUrls.length + existingImages.length < MAX_IMAGE_COUNT && (
                <button
                  type="button"
                  onClick={() => document.getElementById('imageUpload')?.click()}
                  className="relative cursor-pointer"
                >
                  <div className="relative h-40 w-40">
                    <img src={DefaultImage.src} alt="Default" className="h-40 w-40 rounded-md object-cover" />
                  </div>
                </button>
              )}
              {existingImages.map(image => (
                <div key={image.id} className="relative inline-block h-40 w-40">
                  <img src={image.source} alt="Existing_Image" className="h-40 w-40 rounded-md object-cover" />
                  <button type="button" className="absolute right-2 top-2" onClick={() => handleImageRemove(image.id)}>
                    <IoMdCloseCircle size={24} className="text-white" />
                  </button>
                </div>
              ))}
              {uploadedImageUrls.map(url => (
                <div key={url} className="relative inline-block h-40 w-40">
                  <img src={url} alt="Uploaded_Image" className="h-40 w-40 rounded-md object-cover" />
                  <button type="button" className="absolute right-2 top-2" onClick={() => handleImageRemove(url)}>
                    <IoMdCloseCircle size={24} className="text-white" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <input
            type="file"
            accept="image/*"
            id="imageUpload"
            onChange={handleImageChange}
            className="hidden"
            multiple
          />
        </div>
        <button
          type="button"
          onClick={handleSubmit}
          className="w-full rounded-lg bg-blue-500 p-3 text-white hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? '처리 중...' : isEdit ? '수정하기' : '작성하기'}
        </button>
      </div>
    </Modal>
  )
}

export default ReviewModal
