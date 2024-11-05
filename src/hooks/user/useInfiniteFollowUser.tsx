import { useInfiniteQuery } from '@tanstack/react-query'
import { getUserFollows } from '@/libs/axios/mypage/apis'
import { GetUserFollowsParams } from '@/libs/axios/mypage/types'

export default function useInfiniteFollowUser(params: GetUserFollowsParams) {
  const queryKey = params.type === 'follower' ? ['userFollowers', params.userId] : ['userFollowees', params.userId]

  return useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam }: { pageParam: number | null }) => getUserFollows({ ...params, cursor: pageParam }),
    initialPageParam: null,
    getNextPageParam: lastPage => lastPage.nextCursor ?? undefined,
  })
}
