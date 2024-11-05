import { useCallback, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useAuth } from '@/contexts/AuthProvider'
import { useToaster } from '@/contexts/ToasterProvider'
import KakaoIcon from '@icons/icon_kakao.svg'

export default function KakaoOauthButton() {
  const { oAuthLogin } = useAuth()
  const toaster = useToaster()
  const router = useRouter()

  const KAKAO_REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY
  const redirectUri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI

  const handleKakaoClick = () => {
    const kakaoOauthUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_REST_API_KEY}&redirect_uri=${redirectUri}`
    window.location.href = kakaoOauthUrl
    const width = 480
    const height = 702
    const left = window.screenX + (window.innerWidth - width) / 2
    const top = window.screenY + (window.innerHeight - height) / 2
    const kakaoWindow = window.open(
      kakaoOauthUrl,
      'Kakao로 로그인',
      `left=${left},top=${top},width=${width},height=${height}`,
    )
    if (!kakaoWindow) {
      toaster('warn', '팝업을 열 수 없습니다. 팝업이 차단되어 있는지 확인해 주세요.')
    }
  }

  const handleSubmit = useCallback(
    async (token: string) => {
      await oAuthLogin({ redirectUri, token }, 'kakao')
      router.push(`/`)
    },
    [oAuthLogin, redirectUri, router],
  )

  const handleAuthCode = useCallback(() => {
    const token = localStorage.getItem('authCode')
    if (!token) {
      router.push(`/oauth/kakao`)
      return
    }
    handleSubmit(token)
  }, [handleSubmit, router])

  useEffect(() => {
    window.addEventListener('storage', handleAuthCode)

    return () => {
      window.removeEventListener('storage', handleAuthCode)
    }
  }, [handleAuthCode])
  return (
    <button
      type="button"
      title="카카오 로그인"
      className="rounded-full border-solid border-brand-black-light"
      onClick={handleKakaoClick}
    >
      <Image width={56} src={KakaoIcon} alt="카카오 로고" />
    </button>
  )
}
