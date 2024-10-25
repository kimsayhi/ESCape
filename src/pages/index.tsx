import React from 'react'
import ProductReviewList from '@/components/productDetail/ProductReviewList'

const HomePage: React.FC = () => {
  const productId = 1 // 예시로 사용할 productId
  const teamId = '8-5' // 고정된 teamId

  return (
    <div>
      <ProductReviewList productId={productId} teamId={teamId} />
    </div>
  )
}

export default HomePage
