import Image from 'next/image'
import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import defaultImage from '@images/default_image.png'
import Modal from '../@shared/modal/Modal'
import FollowUserList from '../@shared/modal/FollowUserList'
import CustomButton from '../@shared/button/CustomButton'
import { FollowListTypes, FollowResponseTypes, UserTypes } from '@/dtos/UserDto'
import { getUserFollows } from '@/libs/axios/mypage/apis'

interface ProfileProps {
  data: UserTypes
}

export default function Profile({ data: userData }: ProfileProps) {
  const [modalType, setModalType] = useState('팔로워')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const toggleModal = () => setIsModalOpen((prev) => !prev)

  const { id, image, nickname, description, followersCount, followeesCount } = userData
  const profileImage = !!image ? image : defaultImage

  const {
    isPending: isFollowerPending,
    isError: isFollowerError,
    data: followerList,
  } = useQuery({
    queryKey: ['userFollowers'],
    queryFn: () => getUserFollows({ userId: id, type: '팔로워' }),
    enabled: !!id,
  })

  const {
    isPending: isFolloweePending,
    isError: isFolloweeError,
    data: followeeList,
  } = useQuery({
    queryKey: ['userFollowees'],
    queryFn: () => getUserFollows({ userId: id, type: '팔로잉' }),
    enabled: !!id,
  })

  const handleButtonClick = (type: string) => {
    setModalType(type)
    if (modalType === '팔로워') {
      /** @todo 팔로워/팔로잉 리스트 데이터 전달 */
    }
    toggleModal()
  }

  // TertiaryButton을 위한 임시 onClick 함수
  const temp = () => {
    return
  }

  return (
    <div className="flex w-full flex-col content-center items-center gap-[30px] rounded-xl border-unactive bg-[#252530] px-5 py-[30px] xl:w-[340px]">
      <Image className="rounded-full" src={profileImage} alt="프로필 이미지" width={120} height={120} />
      <div className="flex w-full flex-col gap-[10px]">
        <h3 className="text-center text-xl font-semibold leading-7 text-brand-white">{nickname}</h3>
        <p className="text-sm font-normal leading-tight text-brand-gray-dark">{description}</p>
      </div>

      <div className="flex w-full content-between items-center">
        <button
          className="flex w-full flex-col content-center items-center gap-[10px]"
          onClick={() => handleButtonClick('팔로워')}
        >
          <h4 className="text-center text-lg font-semibold text-brand-white">{followersCount}</h4>
          <p className="text-center text-sm font-normal text-brand-gray-light">팔로워</p>
        </button>
        <button
          className="flex w-full flex-col content-center items-center gap-[10px]"
          onClick={() => handleButtonClick('팔로잉')}
        >
          <h4 className="text-center text-lg font-semibold text-brand-white">{followeesCount}</h4>
          <p className="text-center text-sm font-normal text-brand-gray-light">팔로잉</p>
        </button>
      </div>

      <div className="flex w-full flex-col gap-[10px]">
        <CustomButton active={true}>프로필 편집</CustomButton>
        <CustomButton style="tertiary" active={true} onClick={temp}>
          로그아웃
        </CustomButton>
      </div>

      {isModalOpen && (
        <Modal onClick={toggleModal}>
          <FollowUserList name={nickname} title={`${modalType === '팔로워' ? '을 팔로우' : '이 팔로잉'}`} />
        </Modal>
      )}
    </div>
  )
}
