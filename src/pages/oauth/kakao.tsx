import { useAuth } from '@/contexts/AuthProvider'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
// import { saveTokens } from '@/utils/authTokenStorage'
import { Spinner } from 'flowbite-react'
import { AxiosError } from 'axios'

export default function KakaoSignupPage() {
  const router = useRouter()
  const { oAuthLogin, updateMe } = useAuth()
  const provider = 'kakao'
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const handleOauthCallback = async () => {
      const { code } = router.query

      if (typeof code === 'string') {
        try {
          const signInWithKakao = async (token: string): Promise<void> => {
            try {
              const beforeToken = localStorage.getItem('accessToken')

              /** const redirectUri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI || ''
              const postSignInKakaoResponse = await oAuthLogin({ redirectUri, token }, provider)

              const { accessToken, user } = postSignInKakaoResponse
              const { nickname } = user

              saveTokens({ accessToken })
              updateMe({ nickname }) 
              주석처리 - 김세환
              */

              /**
               * 간편 로그인 api 호출 응답에 신규 사용자 구분이 없기 때문에
               * 닉네임 길이로 신규 사용자인지 아닌지 분별
               */

              // if (user.nickname.length > 10) {
              if (!beforeToken) {
                router.push({
                  pathname: '/oauth/signup/kakao',
                  query: { token: code, provider },
                })
              } else {
                router.push('/product')
              }
            } catch (signInError: unknown) {
              if (signInError instanceof AxiosError && signInError.response && signInError.response.data) {
                const errorMessage = signInError.response.data.message
                if (errorMessage === '등록되지 않은 사용자입니다.') {
                  router.push({
                    pathname: '/oauth/signup/kakao',
                    query: { token, provider },
                  })
                }
              } else {
                console.error('카카오 간편 로그인 API 호출 에러:', signInError)
                setErrorMessage('카카오 간편 로그인 중 오류가 발생했습니다.')
              }
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
      {loading && (
        <div className="text-status-danger mt-20 text-center">
          <Spinner aria-label="로딩 중..." size="lg" />
        </div>
      )}
      {errorMessage && <div className="text-status-danger mt-10 text-center">{errorMessage}</div>}
    </div>
  )
}
