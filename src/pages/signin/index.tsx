import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '@/contexts/AuthProvider'
import Link from 'next/link'
import Image from 'next/image'
import Logo from '../../../public/images/logo.svg'

import EyesShowIcon from '../../../public/icons/icon_eyes_show.svg'
import EyesHiddenIcon from '../../../public/icons/icon_eyes_hidden.svg'

import GoogleOauthButton from '@/components/auth/GoogleOauthButton'
import KakoOauthButton from '@/components/auth/KakoOauthButton'
import PrimaryButton from '@/components/@shared/button/CustomButton'
import { Spinner } from 'flowbite-react'
import { useForm } from 'react-hook-form'

export default function SignInPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const [loading, setLoading] = useState(false)
  const [loginErrorMessage, setLoginErrorMessage] = useState('')
  const router = useRouter()
  const { login, user } = useAuth() // user 상태 추가
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    if (user) {
      router.replace('/')
    }
  }, [user, router])

  const onSubmit = async (data: { email: string; password: string }) => {
    setLoading(true)
    const isLoginSuccess = await login(data)
    if (!isLoginSuccess) {
      setLoginErrorMessage('이메일 혹은 비밀번호를 확인해주세요.')
      setLoading(false)
    } else {
      router.push('/')
    }
  }

  return (
    <div className="mx-auto mt-[200px] max-w-[640px] p-3 text-white">
      <div className="flex justify-center">
        <Link href="/" className="inline-block py-10">
          <Image width={200} src={Logo} alt="로고 이미지" />
        </Link>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-5">
          <label className="block pb-1">이메일</label>
          <input
            type="text"
            className={`bg-brand-black-medium w-full rounded-xl border-solid border-brand-black-light py-4 px-6 text-brand-gray-dark focus:outline-blue-gradation ${
              errors.email ? 'border-red-500' : ''
            }`}
            placeholder="이메일을 입력해주세요"
            {...register('email', {
              required: '이메일은 필수 입력입니다.',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: '이메일 형식으로 작성해 주세요.',
              },
            })}
          />
          {errors.email && <p className="text-red-500 mt-1">{errors.email.message}</p>}
        </div>
        <div className="mb-5">
          <label className="block pb-1">비밀번호</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              className={`bg-brand-black-medium w-full rounded-xl border-solid border-brand-black-light py-4 px-6 text-brand-gray-dark focus:outline-blue-gradation ${
                errors.password ? 'border-red-500' : ''
              }`}
              placeholder="비밀번호를 입력해주세요"
              {...register('password', {
                required: '비밀번호는 필수 입력입니다.',
              })}
            />
            <button
              type="button"
              className="absolute right-5 top-4"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보이기'}
            >
              <Image
                width={25}
                src={showPassword ? EyesShowIcon : EyesHiddenIcon}
                alt={showPassword ? '비밀번호 숨기기 아이콘' : '비밀번호 보이기 아이콘'}
              />
            </button>
          </div>
          {errors.password && <p className="text-red-500 mt-1">{errors.password.message}</p>}
        </div>
        <div className="pt-2">
          <PrimaryButton style="primary" type="submit" active={true}>
            {loading ? <Spinner aria-label="로딩 중..." size="md" /> : '로그인'}
          </PrimaryButton>
        </div>
      </form>
      <div className="mt-10 text-center">
        <p>
          처음이신가요?{' '}
          <Link href="/signup" className="mr-1">
            <u>회원가입</u>
          </Link>
          하러가기
        </p>
        <p className="my-3 text-brand-gray-dark">SNS로 바로 시작하기</p>
        <div className="flex justify-center gap-4">
          <GoogleOauthButton />
          <KakoOauthButton />
        </div>
      </div>
    </div>
  )
}
