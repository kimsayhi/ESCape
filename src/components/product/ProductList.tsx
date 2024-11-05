import { PropsWithChildren } from 'react'
import { ProductTypes } from '@/dtos/ProductDto'
import ProductCard from '../@shared/productCard/ProductCard'

interface ProductListProps {
  productList?: ProductTypes[] | null
}

export default function ProductList({ children, productList = [] }: PropsWithChildren<ProductListProps>) {
  return (
    <section className="flex flex-col gap-[30px]">
      <div className="text-2xl font-semibold">{children}</div>
      <div className="grid grid-cols-2 gap-[15px] xl:min-w-[940px] xl:grid-cols-3 xl:gap-5">
        {productList &&
          productList.length > 0 &&
          productList.map(product => <ProductCard key={product.id} data={product} productId={product.id} />)}
      </div>
    </section>
  )
}
