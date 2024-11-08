import { signIn } from '@/libs/axios/auth/auth'
import oAuthSignIn from '@/libs/axios/oauth/oAuthSignIn'
import { OAuthProviders, OAuthSignInForm, SignInForm, SignInReturn } from '@/dtos/AuthDto'
import { CommonUserTypes } from '@/dtos/UserDto'
import { removeTokens } from '@/utils/authTokenStorage'
import { useRouter } from 'next/router'
import getUser from '@/libs/axios/user/getUser'
import { useToaster } from '@/contexts/ToasterProvider'
import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import axios from '@/libs/axios/axiosInstance'

interface updateMeParams {
  description?: string
  image?: string
  nickname?: string
}
interface AuthValues {
  user: CommonUserTypes | null
  isPending: boolean
  login: (formData: SignInForm) => Promise<boolean>
  logout: () => void
  updateMe: (updatedInfo: updateMeParams) => void
  oAuthLogin: (formData: OAuthSignInForm, provider: OAuthProviders) => Promise<SignInReturn>
}

type UserValue = CommonUserTypes | null

const INITIAL_CONTEXT_VALUES: AuthValues = {
  user: null,
  isPending: true,
  login: () => Promise.reject(),
  logout: () => {},
  updateMe: () => {},
  oAuthLogin: () => Promise.reject(),
}

const AuthContext = createContext<AuthValues>(INITIAL_CONTEXT_VALUES)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<{
    user: UserValue
    isPending: boolean
  }>({
    user: null,
    isPending: true,
  })
  const toaster = useToaster()

  const handleAuthChange = (key: 'user' | 'isPending', value: UserValue | boolean) => {
    setAuthState(prev => ({
      ...prev,
      [key]: value,
    }))
  }

  const getMe = useCallback(async () => {
    handleAuthChange('isPending', true)
    let nextUser: UserValue
    try {
      nextUser = await getUser()
      handleAuthChange('user', nextUser)
    } catch (error) {
      console.error('사용자 정보를 불러오지 못했습니다:', error)
      handleAuthChange('user', null)
    } finally {
      handleAuthChange('isPending', false)
    }
  }, [])

  const login = useCallback(
    async (formData: SignInForm): Promise<boolean> => {
      try {
        const signInSuccess = await signIn(formData)

        if (signInSuccess) {
          toaster('success', '로그인에 성공하였습니다.')
          await getMe()
          return true
        }
        return false
      } catch (error) {
        console.error('로그인 중 오류:', error)
        return false
      }
    },
    [getMe, toaster],
  )

  const oAuthLogin = useCallback(
    async (formData: OAuthSignInForm, provider: OAuthProviders) => {
      const user = await oAuthSignIn(formData, provider)
      toaster('success', '로그인에 성공하였습니다.')
      await getMe()
      return user
    },
    [getMe, toaster],
  )

  const logout = useCallback(() => {
    handleAuthChange('user', null)
    removeTokens()
    toaster('success', '로그아웃이 되었습니다.')
  }, [toaster])

  const updateMe = useCallback(
    async (updatedInfo: updateMeParams) => {
      const user = {
        description: updatedInfo.description || authState.user?.description,
        nickname: updatedInfo.nickname || authState.user?.nickname,
        image: updatedInfo.image || authState.user?.image,
      }
      try {
        const res = await axios.patch('/users/me', user)
        const nextUser = res.data
        handleAuthChange('user', nextUser)
      } catch (error) {
        console.error('사용자 정보 업데이트에 실패했습니다:', error)
        toaster('warn', '사용자 정보 업데이트에 실패했습니다.')
      }
    },
    [toaster, authState.user?.description, authState.user?.image, authState.user?.nickname],
  )

  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      getMe()
    } else {
      handleAuthChange('isPending', false)
    }
  }, [getMe])

  const providerValueProp = useMemo(
    () => ({
      user: authState.user,
      isPending: authState.isPending,
      login,
      logout,
      oAuthLogin,
      updateMe,
    }),
    [authState.user, authState.isPending, login, logout, oAuthLogin, updateMe],
  )

  return <AuthContext.Provider value={providerValueProp}>{children}</AuthContext.Provider>
}

export function useAuth(required?: boolean) {
  const context = useContext(AuthContext)
  const toaster = useToaster()
  const router = useRouter()

  if (!context) throw new Error('useAuth는 반드시 AuthProvider 노드 안에서 사용돼야 합니다.')

  useEffect(() => {
    if (required && !context.user && !context.isPending) {
      toaster('warn', '로그인이 필요한 페이지입니다.')
      router.push('/signin')
    }
  }, [required, context.user, context.isPending, router, toaster])

  return context
}
