import Image from 'next/image'
import React from 'react'
import profileImage from '../../../public/images/profile_image.png'
import CustomButton from '../@shared/button/CustomButton'

export default function Profile() {
  // TertiaryButton을 위한 임시 onClick 함수
  const temp = () => {
    return
  }

  return (
    <div className="flex w-full flex-col content-center items-center gap-[30px] rounded-xl border-unactive bg-[#252530] px-5 py-[30px] xl:w-[340px]">
      <Image className="rounded-full" src={profileImage} alt="프로필 이미지" width={120} height={120} />
      <div className="flex w-full flex-col gap-[10px]">
        <h3 className="text-center text-xl font-semibold leading-7 text-brand-white">User name</h3>
        <p className="text-sm font-normal leading-tight text-brand-gray-dark">User description</p>
      </div>

      <div className="flex w-full content-between items-center">
        <div className="flex w-full flex-col content-center items-center gap-[10px] border-r border-r-unactive">
          <h4 className="text-center text-lg font-semibold text-brand-white">follower</h4>
          <p className="text-center text-sm font-normal text-brand-gray-light">팔로워</p>
        </div>
        <div className="flex w-full flex-col content-center items-center gap-[10px]">
          <h4 className="text-center text-lg font-semibold text-brand-white">following</h4>
          <p className="text-center text-sm font-normal text-brand-gray-light">팔로잉</p>
        </div>
      </div>

      <div className="flex w-full flex-col gap-[10px]">
        <CustomButton active={true}>프로필 편집</CustomButton>
        <CustomButton style="tertiary" active={true} onClick={temp}>
          로그아웃
        </CustomButton>
      </div>
    </div>
  )
}
