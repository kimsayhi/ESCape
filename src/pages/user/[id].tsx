import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'
import { useAuth } from '@/contexts/AuthProvider'
import { getUserInfo } from '@/libs/axios/mypage/apis'
import { Spinner } from 'flowbite-react'
import Profile from '@/components/mypage/Profile'
import ActivityCardList from '@/components/mypage/ActivityCardList'
import ProductCardList from '@/components/mypage/ProductCardList'
import { useToaster } from '@/contexts/ToasterProvider'

export default function UserPage() {
  const { user: myInfo } = useAuth()
  const router = useRouter()
  const { id } = router.query
  const queryId = Array.isArray(id) ? id[0] : id

  const toaster = useToaster()

  useEffect(() => {
    if (!queryId) {
      toaster('warn', '유효하지 않은 유저 아이디입니다.')
      return
    }

    if (myInfo && myInfo.id.toString() === queryId) {
      router.push('/mypage')
    }
  }, [toaster, myInfo, queryId, router])

  const {
    isPending,
    isError,
    data,
    refetch: refetchUserInfo,
  } = useQuery({
    queryKey: ['userInfo', queryId],
    queryFn: () => getUserInfo({ userId: queryId! }),
    enabled: !!queryId,
  })

  refetchUserInfo()

  if (isPending) return <Spinner aria-label="로딩 중..." size="xl" />
  if (isError) return <p>failed..</p>

  return (
    <div className="m-auto my-[30px] max-w-[335px] md:my-[40px] md:max-w-[509px] xl:my-[60px] xl:max-w-[1340px]">
      <section className="mb-[60px] xl:float-left xl:mr-[60px]">
        <Profile data={data} refetchUserInfo={refetchUserInfo} />
      </section>
      <section className="mb-[60px]">
        <ActivityCardList data={data} />
      </section>
      <ProductCardList data={data} />
    </div>
  )
}
