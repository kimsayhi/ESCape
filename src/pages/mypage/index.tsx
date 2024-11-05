import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'
import { getMyInfo } from '@/libs/axios/mypage/apis'
import { useAuth } from '@/contexts/AuthProvider'
import { Spinner } from 'flowbite-react'
import Profile from '@/components/mypage/Profile'
import ActivityCardList from '@/components/mypage/ActivityCardList'
import ProductCardList from '@/components/mypage/ProductCardList'

export default function MyPage() {
  const router = useRouter()
  const { user: myInfo } = useAuth()

  useEffect(() => {
    if (!myInfo) {
      router.push('/signin')
    }
  }, [myInfo, router])

  const {
    isPending,
    isError,
    data,
    refetch: refetchMyInfo,
  } = useQuery({
    queryKey: ['myInfo'],
    queryFn: getMyInfo,
    enabled: !!myInfo,
    refetchOnWindowFocus: true,
  })

  refetchMyInfo()

  if (isPending) return <Spinner aria-label="로딩 중..." size="xl" />
  if (isError) return <p>failed..</p>

  return (
    <div className="m-auto my-[30px] max-w-[335px] md:my-[40px] md:max-w-[509px] xl:my-[60px] xl:max-w-[1340px]">
      <section className="mb-[60px] xl:float-left xl:mr-[60px]">
        <Profile data={data} />
      </section>
      <section className="mb-[60px]">
        <ActivityCardList data={data} />
      </section>
      <ProductCardList data={data} />
    </div>
  )
}
