import { useAuth } from '@/contexts/AuthProvider'
import { saveTokens } from '@/utils/authTokenStorage'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import axios from '@/libs/axios/axiosInstance'

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

      // 코드가 존재하지 않으면 에러 페이지로 리다이렉트
      if (!code) {
        router.push('/error')
        return
      }

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
              /**
               * 간편 로그인 api 호출 응답에 신규 사용자 구분이 없기 때문에
               * 닉네임 길이로 신규 사용자인지 아닌지 분별
               * 처음 간편 로그인 시 구글에서 주는 닉네임이 10자 이상의 숫자값이기 때문
               */
              if (user.nickname.length > 10) {
                router.push({
                  pathname: '/oauth/signup/google',
                  query: { token: googleOauthToken, provider },
                })
              } else {
                router.push('/product')
              }
            } catch (signInError) {
              console.error('구글 간편 로그인 API 호출 에러:', signInError)
              setErrorMessage('구글 간편 로그인 중 오류가 발생했습니다.')
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
      {loading && <div className="text-status-danger mt-10 text-center">구글 인증 중</div>}
      {errorMessage && <div className="text-status-danger mt-10 text-center">{errorMessage}</div>}
    </div>
  )
}
