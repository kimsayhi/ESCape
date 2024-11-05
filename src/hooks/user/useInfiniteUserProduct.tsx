import { useInfiniteQuery } from '@tanstack/react-query'
import { getUserProducts } from '@/libs/axios/mypage/apis'
import { GetUserProductsParams } from '@/libs/axios/mypage/types'

function useInfiniteUserProduct(params: GetUserProductsParams) {
  return useInfiniteQuery({
    queryKey: ['productType', params.userId, params.cursor],
    queryFn: ({ pageParam }: { pageParam: number | null }) => getUserProducts({ ...params, cursor: pageParam }),
    initialPageParam: null,
    getNextPageParam: lastPage => lastPage.nextCursor ?? undefined,
  })
}

export default useInfiniteUserProduct
