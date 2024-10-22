import { useAuth } from '@/contexts/AuthProvider'
import { useState, useEffect } from 'react'

export default function HomePage() {
  const { user, logout } = useAuth()
  const [isLogin, setIsLogin] = useState<boolean>(false)

  const handleLogout = () => {
    logout()
  }

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      setIsLogin(true)
    } else {
      setIsLogin(false)
    }
  }, [user])

  return (
    <>
      <h2 className="p-10 text-white">홈 화면입니다.</h2>
      <div className="flex gap-6 p-10">
        {user ? (
          <>
            <span className="text-white">이름: {user.nickname}</span>
            <button type="button" className="text-white" onClick={handleLogout}>
              로그아웃
            </button>
          </>
        ) : (
          <>
            <a className="text-white" href="/signin">
              로그인
            </a>
            <button type="button" className="text-white" onClick={handleLogout}>
              로그아웃
            </button>
          </>
        )}
      </div>
    </>
  )
}
