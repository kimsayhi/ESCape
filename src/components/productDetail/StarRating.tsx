import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'

interface StarRatingProps {
  rating: number
  maxStars?: number
  color?: string
}

const StarRating: React.FC<StarRatingProps> = ({ rating, maxStars = 5, color = '#518CFC' }) => {
  // 음수, NaN, 또는 비정상적인 값에 대한 보호
  if (isNaN(rating) || rating < 0) {
    console.error('Invalid rating value:', rating)
    rating = 0
  }

  if (isNaN(maxStars) || maxStars <= 0) {
    console.error('Invalid maxStars value:', maxStars)
    maxStars = 5
  }

  // fullStars, halfStar, emptyStars 값 검증
  const fullStars = Math.max(0, Math.floor(rating)) // 음수가 되지 않도록 보장
  const halfStar = rating - fullStars >= 0.5 ? 1 : 0
  const emptyStars = Math.max(0, maxStars - fullStars - halfStar) // 음수가 되지 않도록 보장

  // 디버깅 정보 출력
  console.log('rating:', rating, 'fullStars:', fullStars, 'halfStar:', halfStar, 'emptyStars:', emptyStars)

  return (
    <div className="flex">
      {Array(fullStars)
        .fill(0)
        .map((_, index) => (
          <FaStar key={index} style={{ color }} />
        ))}

      {halfStar === 1 && <FaStarHalfAlt style={{ color }} />}

      {Array(emptyStars)
        .fill(0)
        .map((_, index) => (
          <FaRegStar key={index} style={{ color }} />
        ))}
    </div>
  )
}

export default StarRating
