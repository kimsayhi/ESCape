import Image from 'next/image'
import GoogleIcon from '../../../public/icons/icon_google.svg'

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ''
const REDIRECT_URI = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI

export default function GoogleOauthButton() {
  const handleGoogleClick = () => {
    const googleOauthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=openid email profile`
    window.location.href = googleOauthUrl
  }

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
