import React, { useState } from 'react'
import axios from 'axios'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { useRouter } from 'next/router'
import { useAuth } from '@/contexts/AuthProvider'

interface FavoriteButtonProps {
  productId: number
  teamId: string
  isFavorite: boolean // 부모 컴포넌트로부터 받을 초기 상태
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ productId, teamId, isFavorite: initialIsFavorite }) => {
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite)
  const { user, isPending } = useAuth()
  const router = useRouter()

  const handleFavoriteToggle = async () => {
    if (!user && !isPending) {
      alert('로그인이 필요합니다.')
      router.push('/signin')
      return
    }

    try {
      if (isFavorite) {
        await axios.delete(`https://mogazoa-api.vercel.app/${teamId}/products/${productId}/favorite`)
      } else {
        await axios.post(`https://mogazoa-api.vercel.app/${teamId}/products/${productId}/favorite`)
      }
      setIsFavorite((prevIsFavorite) => !prevIsFavorite)
    } catch (error) {
      console.error('찜하기 처리 중 오류가 발생했습니다.', error)
    }
  }

  return (
    <button
      onClick={handleFavoriteToggle}
      className="ml-4 flex items-center justify-center rounded-lg text-red-500 hover:text-red-600"
    >
      {isFavorite ? <FaHeart size={24} /> : <FaRegHeart size={24} />}
    </button>
  )
}

export default FavoriteButton
