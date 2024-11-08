import { useAuth } from '@/contexts/AuthProvider'
import { saveTokens } from '@/utils/authTokenStorage'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import axios, { AxiosError } from 'axios'
import { Spinner } from 'flowbite-react'

export default function GoogleOauth() {
  const router = useRouter()
  const { oAuthLogin, updateMe } = useAuth()
  const provider = 'google'
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  const fetchGoogleOauthToken = async (code: string): Promise<string | null> => {
    try {
      const response = await axios.post(
        'https://oauth2.googleapis.com/token',
        new URLSearchParams({
          code,
          client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '',
          client_secret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET || '',
          redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI || '',
          grant_type: 'authorization_code',
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      )
      return response.data.id_token // Google의 경우에는 Google Id 토큰(JWT)을 token으로 사용
    } catch (fetchTokenError) {
      console.error('ID 토큰 가져오기 실패:', fetchTokenError)
      return null
    }
  }

  useEffect(() => {
    const handleOauthCallback = async () => {
      const { code } = router.query

      if (typeof code === 'string') {
        try {
          const googleOauthToken = await fetchGoogleOauthToken(code)
          if (!googleOauthToken) {
            setErrorMessage('googleOauthToken 가져오기 실패')
            setLoading(false)
            return
          }

          const signInWithGoogle = async (token: string): Promise<void> => {
            try {
              const redirectUri = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI || ''
              const postSignInGoogleResponse = await oAuthLogin({ redirectUri, token }, provider)
              const { accessToken, user } = postSignInGoogleResponse
              const { nickname } = user

              saveTokens({ accessToken })
              updateMe({ nickname })

              if (user.nickname.length > 10) {
                router.push({
                  pathname: '/oauth/signup/google',
                  query: { token: googleOauthToken, provider },
                })
              } else {
                router.push('/product')
              }
            } catch (signInError: unknown) {
              if (signInError instanceof AxiosError && signInError.response && signInError.response.data) {
                const errorMessage = signInError.response.data.message
                if (errorMessage === '등록되지 않은 사용자입니다.') {
                  router.push({
                    pathname: '/oauth/signup/google',
                    query: { token, provider },
                  })
                }
              } else {
                console.error('구글 간편 로그인 API 호출 에러:', signInError)
                setErrorMessage('구글 간편 로그인 중 오류가 발생했습니다.')
              }
            }
          }

          await signInWithGoogle(googleOauthToken) // Google Id 토큰(JWT)을 가지고 간편 로그인
        } catch (error) {
          setErrorMessage('로그인 중 오류 발생')
          console.error('로그인 처리 중 에러 발생:', error)
        } finally {
          setLoading(false)
        }
      }
    }

    handleOauthCallback()
  }, [router, oAuthLogin, updateMe])

  return (
    <div>
      {loading && (
        <div className="text-status-danger mt-20 text-center">
          <Spinner aria-label="로딩 중..." size="lg" />
        </div>
      )}
      {errorMessage && <div className="text-status-danger mt-10 text-center">{errorMessage}</div>}
    </div>
  )
}
