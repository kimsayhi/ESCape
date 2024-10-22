import Profile from '@/components/mypage/Profile'
import Activity from '@/components/mypage/Activity'
import ThemeCardList from '@/components/mypage/ThemeCardList'

export default function MyPage() {
  return (
    <>
      <div className="m-auto max-w-[335px] md:max-w-[509px] xl:max-w-[1340px]">
        <section className="mb-[60px] xl:float-left xl:mr-[60px]">
          <Profile />
        </section>
        <section className="mb-[60px]">
          <Activity />
        </section>
        <ThemeCardList />
      </div>
    </>
  )
}
