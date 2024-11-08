import Image from 'next/image'
import KakaoIcon from '../../../public/icons/icon_kakao.svg'

export default function KakaoOauthButton() {
  const KAKAO_REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY
  const redirectUri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI

  const handleKakaoClick = () => {
    const kakaoOauthUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_REST_API_KEY}&redirect_uri=${redirectUri}`
    window.location.href = kakaoOauthUrl
  }

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
