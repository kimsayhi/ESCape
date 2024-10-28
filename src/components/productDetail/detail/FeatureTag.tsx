import StarRating from '../StarRating'

interface FeatureTagProps {
  label: string
  value: number | string
  isStarRating?: boolean
}

const FeatureTag: React.FC<FeatureTagProps> = ({ label, value, isStarRating = false }) => {
  return (
    <div className="flex items-center space-x-1.5">
      <div className="rounded-full bg-blue-900 px-3 py-1 text-white">
        <span>{label}</span>
      </div>
      {isStarRating ? <StarRating rating={value as number} /> : <span>{value}</span>}
    </div>
  )
}

export default FeatureTag
