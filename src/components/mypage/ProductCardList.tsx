import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Spinner } from 'flowbite-react'
import { useQueryClient } from '@tanstack/react-query'
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
  const router = useRouter()
  const queryClient = useQueryClient()
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

  useEffect(() => {
    const handleRouteChange = () => {
      setActiveMenu(0)
    }

    router.events.on('routeChangeStart', handleRouteChange)

    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [router])

  const allProducts = productList?.pages.flatMap(page => page.list)

  const handleProductMenuClicked = (selectedId: number) => {
    setActiveMenu(selectedId)
  }

  useEffect(() => {
    queryClient.removeQueries({ queryKey: ['productType'] })
    refetchProductList()
  }, [queryClient, refetchProductList, activeMenu])

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
      {isPending && <Spinner aria-label="로딩 중..." size="xl" />}
      {isError && (
        <p className="font-normal text-brand-gray-dark">테마 리스트 불러오기에 실패하였습니다. 다시 시도해주세요.</p>
      )}
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
