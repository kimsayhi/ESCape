import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useState } from 'react'
import { useAuth } from '@/contexts/AuthProvider'
import oAuthSignUp from '@/libs/axios/oauth/oAuthSignUp'
import { saveTokens } from '@/utils/authTokenStorage'
import CustomButton from '@/components/@shared/ui/CustomButton'
import { Spinner } from 'flowbite-react'
import Logo from '../../../public/images/logo.svg'

interface NicknameFormInputs {
  nickname: string
}

export default function NicknamePage() {
  const router = useRouter()
  const { oAuthLogin, updateMe } = useAuth()
  const { token, provider } = router.query
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<NicknameFormInputs>()

  const handleNicknameSubmit: SubmitHandler<NicknameFormInputs> = async data => {
    if (!token || !provider) {
      setError('nickname', {
        type: 'manual',
        message: '잘못된 요청입니다. 다시 시도해 주세요.',
      })
      return
    }

    const formData = {
      nickname: data.nickname,
      redirectUri: `${process.env.NEXT_PUBLIC_REDIRECT_URI}${provider}`,
      token: token as string,
    }

    setLoading(true)
    try {
      const isSignUpSuccess = await oAuthSignUp(formData, provider as 'google' | 'kakao')
      if (isSignUpSuccess) {
        const loginData = {
          redirectUri: formData.redirectUri,
          token: formData.token,
        }

        const response = await oAuthLogin(loginData, provider as 'google' | 'kakao')
        const { accessToken, user } = response
        const { nickname } = user

        saveTokens({ accessToken })
        updateMe({ nickname })

        if (response) {
          router.push('/product')
        }
      } else {
        setError('nickname', {
          type: 'manual',
          message: '회원가입 중 문제가 발생했습니다. 다시 시도해 주세요.',
        })
      }
    } catch (error) {
      console.error('회원가입 중 오류:', error)
      setError('nickname', {
        type: 'server',
        message: '회원가입 중 문제가 발생했습니다. 다시 시도해 주세요.',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto mt-[200px] w-full max-w-[640px] p-3 text-white">
      <div className="flex justify-center">
        <Link href="/" className="inline-block py-10">
          <Image width={200} src={Logo} alt="로고 이미지" />
        </Link>
      </div>
      <form onSubmit={handleSubmit(handleNicknameSubmit)}>
        <div className="mb-5">
          <span className="block pb-1">닉네임</span>
          <input
            type="text"
            className={`w-full rounded-xl border border-solid px-6 py-4 text-brand-gray-dark focus:outline-blue-gradation ${errors.nickname ? 'border-red-500' : 'border-brand-black-light bg-brand-black-medium'}`}
            placeholder="닉네임을 입력해주세요"
            {...register('nickname', {
              required: '닉네임은 필수 입력입니다.',
              maxLength: {
                value: 10,
                message: '닉네임은 최대 10자까지 가능합니다.',
              },
            })}
          />
          {errors.nickname && (
            <p className="mt-2 text-sm text-red-500" aria-live="assertive">
              {errors.nickname.message}
            </p>
          )}
        </div>
        <div className="pt-2">
          <CustomButton styleType="primary" type="submit" active>
            {loading ? <Spinner aria-label="로딩 중..." size="md" /> : '가입하기'}
          </CustomButton>
        </div>
      </form>
    </div>
  )
}
