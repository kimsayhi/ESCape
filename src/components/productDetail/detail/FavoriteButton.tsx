import React, { useState } from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { useRouter } from 'next/router'
import { useAuth } from '@/contexts/AuthProvider'
import { useToaster } from '@/contexts/ToasterProvider'
import { addFavorite, removeFavorite } from '@/libs/axios/product/productApi'

interface FavoriteButtonProps {
  productId: number
  isFavorite: boolean
  onRefetch: () => void
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ productId, isFavorite: initialIsFavorite, onRefetch }) => {
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite)
  const { user, isPending } = useAuth()
  const toaster = useToaster()
  const router = useRouter()

  const handleFavoriteToggle = async () => {
    if (!user && !isPending) {
      toaster('fail', '로그인이 필요합니다.')
      router.push('/signin')
      return
    }

    try {
      if (isFavorite) {
        await removeFavorite(productId)
      } else {
        await addFavorite(productId)
      }
      setIsFavorite(prevIsFavorite => !prevIsFavorite)
      onRefetch() // 상태 변경 후 refetch 호출
    } catch (error) {
      console.error('찜하기 처리 중 오류가 발생했습니다.', error)
    }
  }

  return (
    <button
      type="button"
      onClick={handleFavoriteToggle}
      className="ml-4 flex items-center justify-center rounded-lg text-red-500 hover:text-red-600"
    >
      {isFavorite ? <FaHeart size={24} /> : <FaRegHeart size={24} />}
    </button>
  )
}

export default FavoriteButton
