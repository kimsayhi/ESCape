import React, { useMemo, useState } from 'react'
import Image from 'next/image'
import imageIcon from '@icons/image_icon.svg'
import deleteIcon from '@icons/close_icon.svg'
import { Spinner } from 'flowbite-react'
import useEditProfile from '@/hooks/user/useHandleEditProfile'
import CustomButton from '../@shared/ui/CustomButton'

const INPUT_MAX_LENGTH = 10
const TEXTAREA_MAX_LENGTH = 300

const NICKNAME_CHECK = [
  {
    errorId: 0,
    message: '닉네임은 필수 입력입니다.',
  },
  {
    errorId: 1,
    message: '닉네임은 최대 10자까지 가능합니다.',
  },
]

const inputClassNames =
  'w-full rounded-lg border border-brand-gray-dark bg-[#252530] p-5 placeholder:text-sm placeholder:font-normal placeholder:text-brand-gray-dark md:py-[23px]'

type ProfileContentsTypes = {
  image: string | File | null
  nickname: string
  description: string
}

interface EditProfileProps extends ProfileContentsTypes {
  onEdit: (params: ProfileContentsTypes) => void
  isPending: boolean
}

export default function EditProfile({ image, nickname, description, onEdit, isPending }: EditProfileProps) {
  const {
    formValues,
    previewImage,
    textareaCount,
    handleFileInputChange,
    handleFileInputDelete,
    handleInputChange,
    handleTextAreaChange,
  } = useEditProfile({ image, nickname, description, TEXTAREA_MAX_LENGTH })

  const [isNicknameValid, setIsNicknameValid] = useState<number | null>(null)
  const isFormComplete = useMemo(() => {
    const { image, nickname } = formValues

    if (nickname.length < 1) {
      setIsNicknameValid(NICKNAME_CHECK[0].errorId)
      return false
    }
    if (nickname.length > INPUT_MAX_LENGTH) {
      setIsNicknameValid(NICKNAME_CHECK[1].errorId)
      return false
    }
    setIsNicknameValid(null)

    return nickname !== '' && image !== null
  }, [formValues])

  return (
    <div className="flex w-full flex-col content-start items-stretch gap-5 md:gap-10">
      <h3 className="text-xl font-semibold leading-7 xl:text-2xl">프로필 편집</h3>
      <section className="flex flex-col items-start justify-start gap-[10px] md:gap-[15px] xl:gap-5">
        <div className="relative flex content-start items-center">
          <label
            className="relative inline-block h-[140px] w-[140px] cursor-pointer rounded-lg border border-unactive bg-[#252530] md:h-[135px] md:w-[135px] xl:h-[160px] xl:w-[160px]"
            htmlFor="profileImage"
          >
            <div className="absolute left-1/2 top-1/2 float-left -translate-x-1/2 -translate-y-1/2 transform">
              <Image src={imageIcon} alt="이미지 아이콘" width={24} height={24} />
            </div>
            <input className="sr-only" id="profileImage" name="image" type="file" onChange={handleFileInputChange} />
          </label>

          {!!previewImage && (
            <div className="relative inline-block">
              <Image
                className="ml-[10px] inline-block h-[140px] w-[140px] rounded-lg object-cover md:h-[135px] md:w-[135px] xl:h-[160px] xl:w-[160px]"
                src={typeof previewImage === 'string' ? previewImage : ''}
                alt="업로드 한 이미지 미리보기"
                width={140}
                height={140}
              />
              <button onClick={handleFileInputDelete}>
                <Image
                  className="absolute right-2 top-2 rounded-full bg-brand-black-medium p-1 xl:h-[22px] xl:w-[22px]"
                  src={deleteIcon}
                  alt="이미지 삭제 아이콘"
                  width={20}
                  height={20}
                />
              </button>
            </div>
          )}
        </div>

        <div className="relative w-full">
          <input
            className={`${inputClassNames} ${isNicknameValid !== null ? 'border-solid border-brand-red' : ''}`}
            value={formValues.nickname}
            id="nickname"
            name="nickname"
            type="text"
            placeholder="닉네임을 입력해주세요"
            onChange={handleInputChange}
          />
          {isNicknameValid !== null && (
            <p className="mt-2 text-sm text-brand-red">{NICKNAME_CHECK[isNicknameValid].message}</p>
          )}
        </div>

        <div className="relative w-full">
          <textarea
            className={`${inputClassNames} scrollbar-hide`}
            value={formValues.description}
            id="description"
            name="description"
            placeholder="소개를 입력해 주세요"
            maxLength={TEXTAREA_MAX_LENGTH}
            onChange={handleTextAreaChange}
          />
          <p className="absolute bottom-5 right-5 text-right text-sm font-normal text-brand-gray-dark">
            <span>{textareaCount}</span>/{TEXTAREA_MAX_LENGTH}
          </p>
        </div>
      </section>

      <CustomButton styleType="primary" active={isFormComplete || isPending} onClick={() => onEdit(formValues)}>
        {isPending ? <Spinner size="xl" /> : '저장하기'}
      </CustomButton>
    </div>
  )
}
