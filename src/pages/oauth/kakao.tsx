import { useAuth } from '@/contexts/AuthProvider'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { saveTokens } from '@/utils/authTokenStorage'

export default function KakaoSignupPage() {
  const router = useRouter()
  const { oAuthLogin, updateMe } = useAuth()
  const provider = 'kakao'
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

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
          const signInWithKakao = async (token: string): Promise<void> => {
            try {
              const redirectUri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI || ''
              const postSignInKakaoResponse = await oAuthLogin({ redirectUri, token }, provider)

              const { accessToken, user } = postSignInKakaoResponse
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
                  query: { token: code, provider },
                })
              } else {
                router.push('/product')
              }
            } catch (signInError) {
              console.error('카카오 간편 로그인 API 호출 에러:', signInError)
              setErrorMessage('카카오 간편 로그인 중 오류가 발생했습니다.')
            }
          }

          await signInWithKakao(code) // Kakao 인가 코드를 가지고 간편 로그인
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
      {loading && <div className="text-status-danger mt-10 text-center">카카오 인증 중</div>}
      {errorMessage && <div className="text-status-danger mt-10 text-center">{errorMessage}</div>}
    </div>
  )
}
