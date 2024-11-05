import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useAuth } from '@/contexts/AuthProvider'
import { useToaster } from '@/contexts/ToasterProvider'
import GoogleIcon from '@icons/icon_google.svg'

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ''
const GOOGLE_CLIENT_SECRET = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET || ''
const REDIRECT_URI = `http://localhost:3000/oauth/google`

export default function GoogleOauthButton() {
  const { oAuthLogin } = useAuth()
  const router = useRouter()
  const [code, setCode] = useState<string>('')
  const toaster = useToaster()

  const handleGoogleClick = () => {
    const width = 480
    const height = 702
    const left = window.screenX + (window.innerWidth - width) / 2
    const top = window.screenY + (window.innerHeight - height) / 2

    const googleOauthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(
      REDIRECT_URI,
    )}&response_type=code&scope=openid email profile`

    const googleWindow = window.open(
      googleOauthUrl,
      'Google로 로그인',
      `left=${left},top=${top},width=${width},height=${height}`,
    )

    if (!googleWindow) {
      toaster('fail', '팝업을 열 수 없습니다. 팝업 차단이 설정되어 있는지 확인해 주세요.')
      return
    }

    const checkPopup = setInterval(() => {
      if (googleWindow.closed) {
        clearInterval(checkPopup)
      } else {
        const popupUrl = googleWindow.location.href
        if (popupUrl.includes('code=')) {
          const urlParams = new URL(popupUrl)
          const codeParam = urlParams.searchParams.get('code')

          if (codeParam) {
            googleWindow.close()
            clearInterval(checkPopup)
            setCode(codeParam)
          }
        }
      }
    }, 1000)
  }
  const fetchTokens = useCallback(
    async (authCode: string) => {
      const data = {
        code: authCode,
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        redirect_uri: REDIRECT_URI,
        grant_type: 'authorization_code',
      }

      const response = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(data as Record<string, string>),
      })

      const tokenData = await response.json()

      if (tokenData.id_token) {
        localStorage.setItem('authCode', tokenData.id_token)
        try {
          const isSignInSuccess = await oAuthLogin({ redirectUri: REDIRECT_URI, token: tokenData.id_token }, 'google')
          if (isSignInSuccess?.accessToken) {
            toaster('success', '로그인에 성공하였습니다.')
            localStorage.removeItem('authCode')
            router.push('/')
          } else {
            router.push('/oauth/google')
          }
        } catch (error) {
          console.error('로그인 실패:', error)
          toaster('fail', '로그인에 실패하였습니다. 다시 시도해 주세요.')
          router.push('/oauth/google')
        }
      } else {
        console.error('ID 토큰을 가져오는 데 실패했습니다:', tokenData)
        toaster('fail', 'ID 토큰을 가져오지 못했습니다.')
      }
    },
    [oAuthLogin, router, toaster],
  )

  useEffect(() => {
    if (code) {
      fetchTokens(code)
    }
  }, [code, fetchTokens])

  return (
    <button
      type="button"
      title="구글 로그인"
      className="rounded-full border-solid border-brand-black-light"
      onClick={handleGoogleClick}
    >
      <Image width={56} src={GoogleIcon} alt="구글 로고" />
    </button>
  )
}
