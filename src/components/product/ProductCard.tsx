import { ProductTypes } from '@/dtos/ProductDto'

interface ProductCardProps {
  product: ProductTypes
}
export default function ProductCard({ product }: ProductCardProps) {
  return <div key={product.id}>ProductCard</div>
}
