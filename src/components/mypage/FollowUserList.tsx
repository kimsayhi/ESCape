import useInfiniteScroll from '@/hooks/useInfiniteScroll'
import useInfiniteFollowUser from '@/hooks/user/useInfiniteFollowUser'
import { Spinner } from 'flowbite-react'
import FollowUser from './FollowUser'

interface FollowUserListProps {
  type: string
  userId: number | string
  name: string
  title: string
}

export default function FollowUserList({ type, userId, name, title }: FollowUserListProps) {
  const {
    isPending,
    isError,
    data: followUserList,
    fetchNextPage,
  } = useInfiniteFollowUser({
    userId,
    type,
  })

  const { targetRef } = useInfiniteScroll({
    loadMore: () => {
      fetchNextPage()
    },
    hasMore: !!followUserList?.pageParams,
  })

  const allFollowUsers = followUserList?.pages
    .flatMap(page => page.list)
    .map(item => ({
      id: item.id,
      follower: type === 'follower' ? item.follower : undefined,
      followee: type === 'followee' ? item.followee : undefined,
    }))

  return (
    <div className="flex h-full flex-col">
      <h3 className="mb-5 text-xl font-semibold leading-7 md:mb-8 xl:text-2xl">
        {name}님{title}하는 유저
      </h3>
      {isPending && <Spinner aria-label="로딩 중..." size="xl" />}
      {isError && (
        <p className="font-normal text-brand-gray-dark">
          {name}님{title}하는 유저 리스트 불러오기에 실패하였습니다. 다시 시도해주세요.
        </p>
      )}
      {allFollowUsers && allFollowUsers.length > 0 ? (
        <>
          <div className="flex max-h-[456px] flex-col content-center items-start gap-5 overflow-auto scrollbar-hide">
            {allFollowUsers.map(followUser => (
              <FollowUser
                key={followUser.id}
                followUserData={type === 'follower' ? followUser.follower! : followUser.followee!}
              />
            ))}
          </div>
          <div ref={targetRef} className="mb-4" />
        </>
      ) : (
        <p className="font-normal text-brand-gray-dark">아직 없습니다</p>
      )}
    </div>
  )
}
