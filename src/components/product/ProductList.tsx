import { PropsWithChildren } from 'react'
import ProductCard from './ProductCard'
import { ProductTypes } from '@/dtos/ProductDto'

interface ProductListProps {
  productList: ProductTypes[]
}

export default function ProductList({ children, productList }: PropsWithChildren<ProductListProps>) {
  return (
    <section className="flex flex-col gap-[30px]">
      <div className="text-2xl font-semibold">{children}</div>
      <div className="grid grid-cols-2 gap-[15px] md:grid-cols-3 xl:gap-5">
        {productList.length > 0 && productList.map((product) => <ProductCard product={product} />)}
        <div className="min-h-[150px] min-w-[150px] xl:h-[300px] xl:w-[300px]"></div>
        <div className="min-h-[150px] min-w-[150px] xl:h-[300px] xl:w-[300px]"></div>
        <div className="min-h-[150px] min-w-[150px] xl:h-[300px] xl:w-[300px]"></div>
        <div className="min-h-[150px] min-w-[150px] xl:h-[300px] xl:w-[300px]"></div>
        <div className="min-h-[150px] min-w-[150px] xl:h-[300px] xl:w-[300px]"></div>
        <div className="min-h-[150px] min-w-[150px] xl:h-[300px] xl:w-[300px]"></div>
      </div>
    </section>
  )
}
