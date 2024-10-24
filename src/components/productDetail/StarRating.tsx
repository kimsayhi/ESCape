import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'

interface StarRatingProps {
  rating: number
  maxStars?: number
}

const StarRating: React.FC<StarRatingProps> = ({ rating, maxStars = 5 }) => {
  const fullStars = Math.floor(rating)
  const halfStar = rating - fullStars >= 0.5 ? 1 : 0
  const emptyStars = maxStars - fullStars - halfStar

  return (
    <div className="flex">
      {Array(fullStars)
        .fill(0)
        .map((_, index) => (
          <FaStar key={index} style={{ color: '#518CFC' }} />
        ))}

      {halfStar === 1 && <FaStarHalfAlt style={{ color: '#518CFC' }} />}

      {Array(emptyStars)
        .fill(0)
        .map((_, index) => (
          <FaRegStar key={index} style={{ color: '#518CFC' }} />
        ))}
    </div>
  )
}

export default StarRating
