import { useRouter } from 'next/router'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useState } from 'react'
import oAuthSignUp from '@/libs/axios/oauth/oAuthSignUp'
import CustomButton from '@/components/@shared/ui/CustomButton'
import { Spinner } from 'flowbite-react'

interface NicknameFormInputs {
  nickname: string
}

export default function NicknamePage() {
  const router = useRouter()
  const { token, provider } = router.query // 쿼리에서 token과 provider 가져오기
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<NicknameFormInputs>()

  const handleNicknameSubmit: SubmitHandler<NicknameFormInputs> = async data => {
    const formData = {
      nickname: data.nickname,
      redirectUri: `http://localhost:3000/oauth/${provider}`, // 리다이렉트 URI
      token: token as string,
    }

    setLoading(true)
    try {
      const isSignUpSuccess = await oAuthSignUp(formData, provider as 'google' | 'kakao')
      if (isSignUpSuccess) {
        router.push('/product')
      }
    } catch {
      setError('nickname', {
        type: 'server',
        message: '회원가입 중 문제가 발생했습니다. 다시 시도해 주세요.',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto mt-[200px] max-w-[640px] p-3 text-white">
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
