import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'

interface StarRatingProps {
  rating: number
  maxStars?: number
  color?: string
}

const StarRating: React.FC<StarRatingProps> = ({ rating, maxStars = 5, color = '#518CFC' }) => {
  const fullStars = Math.floor(rating)
  const halfStar = rating - fullStars >= 0.5 ? 1 : 0
  const emptyStars = maxStars - fullStars - halfStar

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
