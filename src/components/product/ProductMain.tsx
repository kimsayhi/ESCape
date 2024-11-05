import useProducts from '@/hooks/useProducts'
import useInfiniteProducts from '@/hooks/useInfiniteProduct'
import useInfiniteScroll from '@/hooks/useInfiniteScroll'
import useRouteHandler from '@/hooks/useRouteHandler'
import { CATEGORY_DATA } from '@/libs/constants/category'
import { match } from 'ts-pattern'
import ProductList from './ProductList'
import CustomDropDown from '../@shared/ui/CustomDropDown'

interface DropDownValues<T> {
  label: string
  value: T
}
type DropDownValueType = 'recent' | 'rating' | 'reviewCount'

const DROPDOWN_VALUE: DropDownValues<DropDownValueType>[] = [
  {
    label: '최신순',
    value: 'recent',
  },
  {
    label: '별점순',
    value: 'rating',
  },
  {
    label: '리뷰순',
    value: 'reviewCount',
  },
]

export default function ProductMain() {
  const { keyword, order, category, handleOrder } = useRouteHandler()
  const { data: reviewCountData } = useProducts({ order: 'reviewCount' })
  const { data: ratingData } = useProducts({ order: 'rating' })
  const { data: productData, fetchNextPage } = useInfiniteProducts({
    keyword: (keyword as string) || null,
    order: (order as 'rating' | 'recent' | 'reviewCount') || null,
    categoryId: Number(category as string) || null,
  })
  const { targetRef } = useInfiniteScroll({
    loadMore: () => {
      fetchNextPage()
    },
    hasMore: !!productData?.pageParams,
  })

  const nowCategory = CATEGORY_DATA.find(item => item.id === Number(category))
  const hotProducts = reviewCountData?.list.slice(0, 6) || null
  const ratingProducts = ratingData?.list.slice(0, 6) || null
  const allProducts = productData?.pages.flatMap(page => page.list)

  const renderProductListContent = () =>
    match({ keyword: !!keyword, category: !!category })
      .with({ keyword: false, category: true }, () => <div>{`'${nowCategory?.name}'의 모든 테마`}</div>)
      .with({ keyword: true, category: false }, () => <div>{`'${keyword}'에 대한 검색 결과`}</div>)
      .with({ keyword: true, category: true }, () => (
        <div>{`'${nowCategory?.name}'의 '${keyword}'에 대한 검색 결과`}</div>
      ))
      .otherwise(() => null)

  const renderedContent = renderProductListContent()
  return (
    <div className="xl:h-100vh-xl scroll-hidden flex w-full max-w-[940px] flex-col gap-[60px] xl:min-w-[940px] xl:gap-[80px] xl:pt-[60px]">
      {renderedContent ? (
        <>
          <ProductList productList={allProducts}>
            <div className="flex justify-between">
              {renderedContent}
              <CustomDropDown dropDownValues={DROPDOWN_VALUE} onClick={handleOrder} />
            </div>
          </ProductList>
          <div ref={targetRef} className="mb-4" />
        </>
      ) : (
        <>
          <ProductList productList={hotProducts}>
            <div>
              지금 핫한 테마
              <span className="bg-gradation bg-clip-text text-transparent">TOP 6</span>
            </div>
          </ProductList>
          <ProductList productList={ratingProducts}>
            <div>별점이 높은 테마</div>
          </ProductList>
        </>
      )}
    </div>
  )
}
