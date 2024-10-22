import Image from 'next/image'
import { PropsWithChildren, useEffect, useState } from 'react'
import Link from 'next/link'
import iconHamburger from '@icons/icon_hamburger.svg'
import logoBig from '@images/logo_big_image.png'
import iconGlass from '@icons/icon_glass.svg'
import { useRouter } from 'next/router'
import classNames from 'classnames'

export default function Header({ children }: PropsWithChildren) {
  const [isLogin, setIsLogin] = useState(false)
  const { pathname } = useRouter()
  //엑세스 토큰이 있으면 내프로필, 없으면 로그인
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
      setIsLogin(true)
    } else {
      setIsLogin(false)
    }
  }, [])
  return (
    <>
      {!pathname.includes('sign') && (
        <div className="relative">
          <div className="fixed flex h-[70px] w-full items-center justify-between border-b border-[#252530] bg-body-bg px-5 md:h-[80px] md:px-[30px] xl:h-[100px] xl:px-[120px]">
            <button className="relative h-[11.27px] w-[17px] md:hidden">
              <Image src={iconHamburger} alt="카테고리 보기" fill />
            </button>
            <div className="flex items-center gap-10">
              <Link href="/" className="relative h-[24px] w-[120px] md:h-[28px] md:w-[140px] xl:h-[34px] xl:w-[170px]">
                <Image
                  src={logoBig}
                  alt="로고"
                  fill
                  sizes="(max-width: 768px) 120px, (max-width: 1280px) 140px, 170px"
                />
              </Link>
              <Link href="/board" className="hidden md:block">
                자유게시판
              </Link>
            </div>
            <div className="hidden items-center gap-[30px] md:flex">
              <div className="flex h-[50px] w-[300px] items-center gap-1.5 rounded-[28px] bg-[#252530] px-6">
                <Image src={iconGlass} alt="테마검색" width={18.38} height={18.38} className="hidden md:block" />
                <input placeholder="테마를 검색해 보세요" />
              </div>
              {isLogin ? (
                <Link href="/mypage">내 프로필</Link>
              ) : (
                <>
                  <Link href="signin">로그인</Link>
                  <Link href="signup">회원가입</Link>
                </>
              )}
            </div>
            <button className="relative h-[18.38px] w-[18.38px] md:hidden">
              <Image src={iconGlass} alt="테마검색" fill />
            </button>
          </div>
        </div>
      )}
      <div className={classNames(pathname.includes('sign') ? '' : 'pt-[70px] md:pt-[80px] xl:pt-[100px]')}>
        {children}
      </div>
    </>
  )
}
