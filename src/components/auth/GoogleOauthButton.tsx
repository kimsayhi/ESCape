import { useAuth } from '@/contexts/AuthProvider'
import Image from 'next/image'
import GoogleIcon from '../../../public/icons/icon_google.svg'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET
const REDIRECT_URI = `http://localhost:3000/oauth/google`

export default function GoogleOauthButton() {
  const { oAuthLogin } = useAuth()
  const router = useRouter()
  const [code, setCode] = useState('')

  // 팝업 열기
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
      alert('팝업을 열 수 없습니다. 팝업 차단이 설정되어 있는지 확인해 주세요.')
      return
    }

    // 팝업에서 인증 코드 가져오기
    const checkPopup = setInterval(() => {
      try {
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
      } catch (e) {}
    }, 1000)
  }

  const fetchTokens = async (authCode: string) => {
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
      body: new URLSearchParams(data),
    })

    const tokenData = await response.json()

    if (tokenData.id_token) {
      localStorage.setItem('authCode', tokenData.id_token)
      try {
        const isSignInSuccess = await oAuthLogin({ redirectUri: REDIRECT_URI, token: tokenData.id_token }, 'google')
        if (isSignInSuccess?.accessToken) {
          alert('로그인 성공')
          localStorage.removeItem('authCode')
          router.push('/')
        } else {
          router.push('/oauth/google')
        }
      } catch (error) {
        console.error('로그인 실패:', error)
        alert('로그인에 실패했습니다. 다시 시도해 주세요.')
        router.push('/oauth/google')
      }
    } else {
      console.error('ID 토큰을 가져오는 데 실패했습니다:', tokenData)
      alert('ID 토큰을 가져오지 못했습니다.')
    }
  }

  useEffect(() => {
    if (code) {
      fetchTokens(code)
    }
  }, [code])

  return (
    <button
      type="button"
      title="구글 로그인"
      className="border-solid rounded-full border-brand-black-light"
      onClick={handleGoogleClick}
    >
      <Image width={56} src={GoogleIcon} alt="구글 로고" />
    </button>
  )
}
