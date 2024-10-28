import React, { useState } from 'react'
import axios from 'axios'
import { FaThumbsUp } from 'react-icons/fa'
import { useRouter } from 'next/router' // useRouter 훅을 가져옵니다
import { useAuth } from '@/contexts/AuthProvider'

interface ReviewLikeButtonProps {
  reviewId: number
  teamId: string
  initialIsLiked: boolean
  initialLikeCount: number
}

const ReviewLikeButton: React.FC<ReviewLikeButtonProps> = ({ reviewId, teamId, initialIsLiked, initialLikeCount }) => {
  const [isLiked, setIsLiked] = useState(initialIsLiked)
  const [likeCount, setLikeCount] = useState(initialLikeCount)

  // 로그인 상태 확인
  const { user, isPending } = useAuth() // 로그인 상태와 로딩 상태를 확인
  const router = useRouter() // 라우터 사용

  const handleLikeToggle = async () => {
    if (!user && !isPending) {
      // 로그인이 되어있지 않으면 경고 후 로그인 페이지로 이동
      alert('로그인이 필요합니다.')
      router.push('/signin') // 로그인 페이지로 이동
      return
    }

    try {
      if (isLiked) {
        // 좋아요 해제 (DELETE 요청)
        await axios.delete(`https://mogazoa-api.vercel.app/${teamId}/reviews/${reviewId}/like`)
        setLikeCount((prevCount) => prevCount - 1)
      } else {
        // 좋아요 추가 (POST 요청)
        await axios.post(`https://mogazoa-api.vercel.app/${teamId}/reviews/${reviewId}/like`)
        setLikeCount((prevCount) => prevCount + 1)
      }
      setIsLiked((prevIsLiked) => !prevIsLiked) // 상태 토글
    } catch (error) {
      console.error('좋아요 처리 중 오류가 발생했습니다.', error)
    }
  }

  return (
    <div
      className={`flex cursor-pointer items-center space-x-1 rounded-full border px-3 py-1 ${
        isLiked ? 'border-blue-500 text-blue-500' : 'border-gray-400 text-gray-400'
      }`}
      onClick={handleLikeToggle}
    >
      <FaThumbsUp className={isLiked ? 'text-blue-500' : 'text-gray-400'} />
      <span className={isLiked ? 'font-semibold text-blue-500' : 'font-semibold text-gray-400'}>{likeCount}</span>
    </div>
  )
}

export default ReviewLikeButton
