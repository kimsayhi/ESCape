import { useState } from 'react'
import { Spinner } from 'flowbite-react'
import { UserTypes } from '@/dtos/UserDto'
import useInfiniteUserProduct from '@/hooks/user/useInfiniteUserProduct'
import useInfiniteScroll from '@/hooks/useInfiniteScroll'
import ProductCard from '../@shared/productCard/ProductCard'

const productMenuContents = [
  {
    id: 0,
    title: '리뷰 남긴 테마',
    type: 'reviewed',
  },
  {
    id: 1,
    title: '좋아요 누른 테마',
    type: 'favorite',
  },
]

interface ProductCardListProps {
  data: UserTypes
}

export default function ProductCardList({ data }: ProductCardListProps) {
  const [activeMenu, setActiveMenu] = useState<number>(0)
  const {
    isPending,
    isError,
    data: productList,
    fetchNextPage,
    refetch: refetchProductList,
  } = useInfiniteUserProduct({ userId: data.id, type: productMenuContents[activeMenu].type })

  const { targetRef } = useInfiniteScroll({
    loadMore: () => {
      fetchNextPage()
    },
    hasMore: !!productList?.pageParams,
  })

  const allProducts = productList?.pages.flatMap(page => page.list)

  const handleProductMenuClicked = (selectedId: number) => {
    setActiveMenu(selectedId)
  }

  refetchProductList()

  if (isPending) return <Spinner aria-label="로딩 중..." size="xl" />
  if (isError) return <p>테마 리스트 불러오기에 실패하였습니다. 다시 시도해주세요.</p>

  return (
    <section>
      <div className="mb-[30px] flex items-center justify-normal gap-10">
        {productMenuContents.map(productMenuContent => (
          <button
            key={productMenuContent.id}
            className={`text-lg xl:text-xl ${activeMenu === productMenuContent.id ? 'font-semibold text-brand-white' : 'font-normal text-brand-gray-dark'}`}
            onClick={() => handleProductMenuClicked(productMenuContent.id)}
          >
            {productMenuContent.title}
          </button>
        ))}
      </div>
      {allProducts && allProducts.length > 0 ? (
        <>
          <div className="grid grid-cols-2 gap-[15px] xl:grid-cols-3 xl:gap-5">
            {allProducts.map(product => (
              <ProductCard key={product.id} productId={product.id} data={product} />
            ))}
          </div>
          <div ref={targetRef} className="mb-4" />
        </>
      ) : (
        <p className="font-normal text-brand-gray-dark">아직 {productMenuContents[activeMenu].title}가 없습니다</p>
      )}
    </section>
  )
}
