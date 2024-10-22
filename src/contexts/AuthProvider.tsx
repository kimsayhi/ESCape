import { signIn } from '@/libs/axios/auth/auth'
import { SignInForm, SignInReturn } from '@/dtos/AuthDto'
import { removeTokens } from '@/utils/authTokenStorage'
import { useRouter } from 'next/router'
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react'

interface AuthValues {
  user: any //@todo: 추후 프로필 하시는 분 수정 바람
  isPending: boolean
  login: (formData: SignInForm) => Promise<boolean>
  logout: () => void
}

const INITIAL_CONTEXT_VALUES: AuthValues = {
  user: null,
  isPending: true,
  login: () => Promise.reject(),
  logout: () => {},
}

const AuthContext = createContext<AuthValues>(INITIAL_CONTEXT_VALUES)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<{
    user: any
    isPending: boolean
  }>({
    user: null,
    isPending: true,
  })

  const login = async (formData: SignInForm) => {
    const isSignInSuccess = await signIn(formData)
    if (!isSignInSuccess) {
      alert('로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.')
      return false
    }
    return true
  }

  const logout = () => {
    removeTokens()
    alert('로그아웃이 되었습니다.')
  }

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      // accessToken이 있을 경우 사용자 정보를 가져오는 로직 추가 가능
      // 예시: fetchUserInfo();
    } else {
      setAuthState({
        user: null,
        isPending: false,
      })
    }
  }, [])

  const providerValueProp = useMemo(
    () => ({
      user: authState.user,
      isPending: authState.isPending,
      login,
      logout,
    }),
    [authState.user, authState.isPending],
  )

  return <AuthContext.Provider value={providerValueProp}>{children}</AuthContext.Provider>
}

export function useAuth(required?: boolean) {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth는 반드시 AuthProvider 노드 안에서 사용돼야 합니다.')

  const router = useRouter()
  useEffect(() => {
    if (required && !context.user && !context.isPending) {
      alert('로그인이 필요한 페이지입니다.')
      router.push('/signin')
    }
  }, [required, context.user, context.isPending])

  return context
}
