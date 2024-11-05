import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { signUp } from '@/libs/axios/auth/auth'
import { useAuth } from '@/contexts/AuthProvider'
import Link from 'next/link'
import Image from 'next/image'
import CustomButton from '@/components/@shared/ui/CustomButton'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Spinner } from 'flowbite-react'
import { useToaster } from '@/contexts/ToasterProvider'
import { postUsers } from '@/libs/axios/board/postUsers'
import EyesHiddenIcon from '../../../public/icons/icon_eyes_hidden.svg'
import EyesShowIcon from '../../../public/icons/icon_eyes_show.svg'
import Logo from '../../../public/images/logo.svg'

interface SignUpFormInputs {
  email: string
  nickname: string
  password: string
  passwordConfirmation: string
}

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignUpFormInputs>({
    mode: 'onChange',
  })
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { user, login, isPending } = useAuth()
  const toaster = useToaster()

  useEffect(() => {
    if (!isPending && user) {
      const sendUserPost = async () => {
        await postUsers({ id: Number(user.id), nickname: user.nickname, description: 'string', image: 'string' })
        router.replace('/')
      }
      sendUserPost()
    }
  }, [isPending, user, router])

  const onSubmit: SubmitHandler<SignUpFormInputs> = async data => {
    setLoading(true)
    const { email, password } = data
    const isSignUpSuccess = await signUp(data)

    if (isSignUpSuccess) {
      await login({ email, password })
      router.push('/product')
      return
    }
    setLoading(false)
    toaster('fail', '회원가입에 실패하였습니다.')
  }

  const validatePassword = (value: string): true | string => {
    const regex = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{8,}$/
    if (!regex.test(value)) {
      return '비밀번호는 숫자, 영문, 특수문자를 포함해야 합니다.'
    }
    return true
  }

  const passwordValue = watch('password')
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false)

  return (
    <div className="mx-auto mt-[200px] max-w-[640px] p-3 text-white">
      <div className="flex justify-center">
        <Link href="/" className="inline-block py-10">
          <Image width={200} src={Logo} alt="로고 이미지" />
        </Link>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-5">
          <span className="block pb-1">이메일</span>
          <input
            type="text"
            className={`w-full rounded-xl border-solid bg-brand-black-medium ${
              errors.email ? 'border-red-500' : 'border-brand-black-light'
            } px-6 py-4 text-brand-gray-dark focus:outline-blue-gradation`}
            placeholder="이메일을 입력해주세요"
            {...register('email', {
              required: '이메일은 필수 입력입니다.',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: '이메일 형식으로 작성해 주세요.',
              },
            })}
          />
          {errors.email && <p className="mt-2 text-sm text-red-500">{errors.email.message}</p>}
        </div>
        <div className="mb-5">
          <span className="block pb-1">닉네임</span>
          <input
            type="text"
            className={`w-full rounded-xl border-solid bg-brand-black-medium ${
              errors.nickname ? 'border-red-500' : 'border-brand-black-light'
            } px-6 py-4 text-brand-gray-dark focus:outline-blue-gradation`}
            placeholder="닉네임을 입력해주세요"
            {...register('nickname', {
              required: '닉네임은 필수 입력입니다.',
              maxLength: {
                value: 20,
                message: '닉네임은 최대 20자까지 입력 가능합니다.',
              },
            })}
          />
          {errors.nickname && <p className="mt-2 text-sm text-red-500">{errors.nickname.message}</p>}
        </div>
        <div className="mb-5">
          <span className="block pb-1">비밀번호</span>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              className={`w-full rounded-xl border-solid bg-brand-black-medium ${
                errors.password ? 'border-red-500' : 'border-brand-black-light'
              } px-6 py-4 text-brand-gray-dark focus:outline-blue-gradation`}
              placeholder="비밀번호는 필수 입력입니다."
              {...register('password', {
                required: '비밀번호는 필수 항목입니다.',
                minLength: {
                  value: 8,
                  message: '비밀번호는 최소 8자 이상이어야 합니다.',
                },
                validate: validatePassword,
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
          {errors.password && <p className="mt-2 text-sm text-red-500">{errors.password.message}</p>}
        </div>
        <div className="mb-5">
          <span className="block pb-1">비밀번호 확인</span>
          <div className="relative">
            <input
              type={showPasswordConfirmation ? 'text' : 'password'}
              className={`w-full rounded-xl border-solid bg-brand-black-medium ${
                errors.passwordConfirmation ? 'border-red-500' : 'border-brand-black-light'
              } px-6 py-4 text-brand-gray-dark focus:outline-blue-gradation`}
              placeholder="비밀번호를 다시 입력해주세요"
              {...register('passwordConfirmation', {
                required: '비밀번호 확인을 입력해주세요.',
                validate: value => value === passwordValue || '비밀번호가 일치하지 않습니다.',
              })}
            />
            <button
              type="button"
              className="absolute right-5 top-4"
              onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
              aria-label={showPasswordConfirmation ? '비밀번호 숨기기' : '비밀번호 보이기'}
            >
              <Image
                width={25}
                src={showPasswordConfirmation ? EyesShowIcon : EyesHiddenIcon}
                alt={showPasswordConfirmation ? '비밀번호 숨기기 아이콘' : '비밀번호 보이기 아이콘'}
              />
            </button>
          </div>
          {errors.passwordConfirmation && (
            <p className="mt-2 text-sm text-red-500">{errors.passwordConfirmation.message}</p>
          )}
        </div>
        <div className="pt-2">
          <CustomButton styleType="primary" type="submit" onClick={() => {}} active>
            {loading ? <Spinner aria-label="로딩 중..." size="md" /> : '가입하기'}
          </CustomButton>
        </div>
      </form>

      <div className="mt-10 text-center">
        <p>
          이미 회원이신가요?{' '}
          <Link href="/signin" className="mr-1">
            <u>로그인</u>
          </Link>
          하러가기
        </p>
      </div>
    </div>
  )
}
