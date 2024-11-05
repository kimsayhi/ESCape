import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'

interface StarRatingProps {
  rating: number
  maxStars?: number
  color?: string
}

const StarRating: React.FC<StarRatingProps> = ({ rating, maxStars = 5, color = '#518CFC' }) => {
  const validRating = Number.isNaN(rating) || rating < 0 ? 0 : rating
  const validMaxStars = Number.isNaN(maxStars) || maxStars <= 0 ? 5 : maxStars

  const fullStars = Math.max(0, Math.floor(validRating))
  const halfStar = validRating - fullStars >= 0.5 ? 1 : 0
  const emptyStars = Math.max(0, validMaxStars - fullStars - halfStar)

  return (
    <div className="flex">
      {Array.from({ length: fullStars }, (_, index) => (
        <FaStar key={`full-${index}-${rating}`} style={{ color }} />
      ))}

      {halfStar === 1 && <FaStarHalfAlt key={`half-${rating}`} style={{ color }} />}

      {Array.from({ length: emptyStars }, (_, index) => (
        <FaRegStar key={`empty-${index}-${rating}`} style={{ color }} />
      ))}
    </div>
  )
}

export default StarRating
