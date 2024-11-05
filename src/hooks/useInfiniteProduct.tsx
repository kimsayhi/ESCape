import { getProduct, ProductQueryParams } from '@/libs/axios/product/productApi'
import { useInfiniteQuery } from '@tanstack/react-query'

export default function useInfiniteProducts(params: ProductQueryParams) {
  return useInfiniteQuery({
    queryKey: ['products', params],
    queryFn: ({ pageParam }: { pageParam: number | null }) => getProduct({ ...params, cursor: pageParam }),
    initialPageParam: null,
    getNextPageParam: lastPage => lastPage.nextCursor ?? undefined,
  })
}
