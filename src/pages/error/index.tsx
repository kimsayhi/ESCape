import { useRouter } from 'next/router'
import CustomButton from '@/components/@shared/ui/CustomButton'

export default function ErrorPage() {
  const router = useRouter()

  // 홈으로 이동하는 함수
  const handleClick = () => {
    router.push('/')
  }
  return (
    <div className="mx-auto mt-[200px] max-w-[640px] p-3 text-white">
      <div className="mb-20 text-center">비정상적인 접근입니다.</div>
      <CustomButton styleType="primary" type="button" active onClick={handleClick}>
        홈으로 가기
      </CustomButton>
    </div>
  )
}
