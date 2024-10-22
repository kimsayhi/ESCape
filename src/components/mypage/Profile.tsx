import Image from "next/image";
import React from "react";
import profileImage from "../../../public/images/profile_image.png";
import PrimaryButton from "../@shared/button/PrimaryButton";
import TertiaryButton from "../@shared/button/TertiaryButton";

export default function Profile() {
  // TertiaryButton을 위한 임시 onClick 함수
  const temp = () => {
    return;
  };

  return (
    <div className="flex flex-col content-center items-center gap-[30px] w-full px-5 py-[30px] border-unactive rounded-xl bg-[#252530] xl:w-[340px]">
      <Image
        className="rounded-full"
        src={profileImage}
        alt="프로필 이미지"
        width={120}
        height={120}
      />
      <div className="w-full flex flex-col gap-[10px]">
        <h3 className="text-brand-white text-center text-xl font-semibold leading-7">
          User name
        </h3>
        <p className="text-brand-gray-dark text-sm font-normal leading-tight">
          User description
        </p>
      </div>

      <div className="w-full flex content-between items-center">
        <div className="w-full flex flex-col gap-[10px] content-center items-center border-r border-r-unactive">
          <h4 className="text-center text-brand-white text-lg font-semibold">
            follower
          </h4>
          <p className="text-center text-brand-gray-light text-sm font-normal">
            팔로워
          </p>
        </div>
        <div className="w-full flex flex-col gap-[10px] content-center items-center">
          <h4 className="text-center text-brand-white text-lg font-semibold">
            following
          </h4>
          <p className="text-center text-brand-gray-light text-sm font-normal">
            팔로잉
          </p>
        </div>
      </div>

      <div className="w-full flex flex-col gap-[10px]">
        <PrimaryButton active={true}>프로필 편집</PrimaryButton>
        <TertiaryButton active={true} onClick={temp}>
          로그아웃
        </TertiaryButton>
      </div>
    </div>
  );
}