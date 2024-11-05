import React, { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import defaultProfileImage from '@images/user_default.svg'
import { UserTypes } from '@/dtos/UserDto'
import { updateMyInfo, addImageFile } from '@/libs/axios/mypage/apis'
import { AddImageFileParams, UpdateMyInfoParams } from '@/libs/axios/mypage/types'
import { useAuth } from '@/contexts/AuthProvider'
import { FollowParams } from '@/libs/axios/user/types'
import { addFollow, deleteFollow } from '@/libs/axios/user/apis'
import { patchUsers } from '@/libs/axios/board/patchUsers'
import Modal from '../@shared/modal/Modal'
import CustomButton from '../@shared/ui/CustomButton'
import EditProfile from './EditProfile'
import FollowUserList from './FollowUserList'

type ProfileContentsTypes = {
  image: string | File | null
  nickname: string
  description: string
}

interface ProfileProps {
  data: UserTypes
  refetchUserInfo?: () => void
}

export default function Profile({ data: userData, refetchUserInfo = () => {} }: ProfileProps) {
  const router = useRouter()
  const queryClient = useQueryClient()

  const { user: myInfo, logout, updateMe } = useAuth()
  const { id, image, nickname, description, followersCount, followeesCount, isFollowing } = userData
  const profileImage = typeof image === 'string' ? image : image ? URL.createObjectURL(image) : defaultProfileImage

  const [isFollowingState, setIsFollowingState] = useState<boolean>(isFollowing)
  const [followersCountState, setFollowersCountState] = useState<number>(followersCount)

  const [modalType, setModalType] = useState<string>('follower')
  const [isFollowModalOpen, setIsFollowModalOpen] = useState<boolean>(false)
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState<boolean>(false)
  const [newProfile, setNewProfile] = useState<ProfileContentsTypes>({
    image: myInfo?.image ? myInfo.image : null,
    nickname: myInfo?.nickname ?? '',
    description: myInfo?.description ?? '',
  })

  const toggleFollowModal = useCallback(() => setIsFollowModalOpen(prev => !prev), [])
  const toggleEditProfileModal = useCallback(() => setIsEditProfileModalOpen(prev => !prev), [])

  /** 페이지를 이동하면 열려 있던 모달을 닫는 함수 */
  useEffect(() => {
    const handleRouteChange = () => {
      if (isFollowModalOpen) {
        toggleFollowModal()
      }
      if (isEditProfileModalOpen) {
        toggleEditProfileModal()
      }
    }

    router.events.on('routeChangeStart', handleRouteChange)

    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [router, isFollowModalOpen, isEditProfileModalOpen, toggleFollowModal, toggleEditProfileModal])

  const handleFollowListClick = (type: string) => {
    setModalType(type)
    toggleFollowModal()
  }

  const handleEditProfileButtonClick = () => {
    toggleEditProfileModal()
  }

  const handleLogoutButtonClick = () => {
    logout()
    router.push('/')
  }

  const uploadNewProfileMutation = useMutation({
    mutationFn: async (newProfile: UpdateMyInfoParams) => {
      const response = await Promise.all([
        updateMyInfo(newProfile),
        patchUsers({
          id: Number(myInfo?.id),
          nickname: newProfile.nickname,
          description: newProfile.description,
          image: newProfile.image,
        }),
      ])
      return response[0]
    },
    onSuccess: data => {
      updateMe({ nickname: data.nickname, description: data.description, image: data.image as string })
      queryClient.invalidateQueries({ queryKey: ['myInfo'] })
      toggleEditProfileModal()
    },
  })

  const uploadImageFileMutation = useMutation({
    mutationFn: (newImageFile: AddImageFileParams) => addImageFile(newImageFile),
    onSuccess: imageUrl => {
      uploadNewProfileMutation.mutate({
        image: imageUrl,
        nickname: newProfile?.nickname ?? '',
        description: newProfile?.description ?? '',
      })
    },
  })

  const handleUpdateProfileButtonClick = async ({ image, nickname, description }: ProfileContentsTypes) => {
    setNewProfile({
      image,
      nickname,
      description,
    })

    /** i) 새로운 이미지를 선택한 경우(type File) -> 이미지를 먼저 업로드 한 뒤에 프로필 업데이트 */
    if (image instanceof File) {
      uploadImageFileMutation.mutate({ image })
      return
    }
    /** ii) 기존 이미지와 동일한 경우(type string) -> 바로 프로필 업데이트 */
    uploadNewProfileMutation.mutate({
      image: typeof image === 'string' ? image : '',
      nickname: nickname ?? '',
      description: description ?? '',
    })
  }

  const followUserMutation = useMutation({
    mutationFn: (userId: FollowParams) => addFollow(userId),
    onSuccess: (newUserInfo: UserTypes) => {
      setIsFollowingState(newUserInfo.isFollowing)
      setFollowersCountState(newUserInfo.followersCount)

      queryClient.invalidateQueries({ queryKey: ['myInfo', myInfo?.id] })
      queryClient.invalidateQueries({ queryKey: ['userInfo', id] })
      queryClient.invalidateQueries({ queryKey: ['userFollowers', id] })
      queryClient.invalidateQueries({ queryKey: ['userFollowees', id] })
      refetchUserInfo()
    },
  })

  const handleFollowButtonClick = () => {
    followUserMutation.mutate({ userId: id })
  }

  const unfollowUserMutation = useMutation({
    mutationFn: (userId: FollowParams) => deleteFollow(userId),
    onSuccess: (newUserInfo: UserTypes) => {
      setIsFollowingState(newUserInfo.isFollowing)
      setFollowersCountState(newUserInfo.followersCount)

      queryClient.invalidateQueries({ queryKey: ['myInfo', myInfo?.id] })
      queryClient.invalidateQueries({ queryKey: ['userInfo', id] })
      queryClient.invalidateQueries({ queryKey: ['userFollowers', id] })
      queryClient.invalidateQueries({ queryKey: ['userFollowees', id] })
      refetchUserInfo()
    },
  })

  const handleUnfollowButtonClick = () => {
    unfollowUserMutation.mutate({ userId: id })
  }

  return (
    <>
      <div className="flex w-full flex-col content-center items-center gap-[30px] rounded-xl border-unactive bg-[#252530] px-5 py-[30px] xl:w-[340px]">
        <div className="relative h-[120px] w-[120px] overflow-hidden rounded-full">
          <Image className="object-cover" fill src={profileImage} alt="프로필 이미지" />
        </div>

        <div className="flex w-full flex-col gap-[10px]">
          <h3 className="text-center text-xl font-semibold leading-7 text-brand-white">{nickname}</h3>
          <p className="text-sm font-normal leading-tight text-brand-gray-dark">{description}</p>
        </div>

        <div className="flex w-full content-between items-center">
          <button
            className="flex w-full flex-col content-center items-center gap-[10px]"
            onClick={() => handleFollowListClick('follower')}
          >
            <h4 className="text-center text-lg font-semibold text-brand-white">{followersCountState}</h4>
            <p className="text-center text-sm font-normal text-brand-gray-light">팔로워</p>
          </button>
          <button
            className="flex w-full flex-col content-center items-center gap-[10px]"
            onClick={() => handleFollowListClick('followee')}
          >
            <h4 className="text-center text-lg font-semibold text-brand-white">{followeesCount}</h4>
            <p className="text-center text-sm font-normal text-brand-gray-light">팔로잉</p>
          </button>
        </div>

        {!!myInfo && myInfo.id === userData.id ? (
          <div className="flex w-full flex-col gap-[10px]">
            <CustomButton active onClick={handleEditProfileButtonClick}>
              프로필 편집
            </CustomButton>
            <CustomButton styleType="tertiary" active onClick={handleLogoutButtonClick}>
              로그아웃
            </CustomButton>
          </div>
        ) : isFollowingState ? (
          <CustomButton styleType="tertiary" active onClick={handleUnfollowButtonClick}>
            팔로우 취소
          </CustomButton>
        ) : (
          <CustomButton active={!!myInfo} onClick={handleFollowButtonClick}>
            팔로우
          </CustomButton>
        )}
      </div>

      {isFollowModalOpen && (
        <Modal
          onClick={toggleFollowModal}
          modalFrameClassNames="max-h-[550px] w-[335px] md:max-h-[600px] md:w-[500px] xl:max-h-[660px]"
        >
          <FollowUserList
            type={modalType}
            userId={id}
            name={nickname}
            title={`${modalType === 'follower' ? '을 팔로우' : '이 팔로잉'}`}
          />
        </Modal>
      )}

      {isEditProfileModalOpen && (
        <Modal
          onClick={toggleEditProfileModal}
          modalFrameClassNames="max-h-[550px] w-[335px] overflow-auto scrollbar-hide md:max-h-[600px] md:w-[500px] xl:max-h-[660px]"
        >
          <EditProfile
            image={image || null}
            nickname={nickname ?? ''}
            description={description ?? ''}
            onEdit={handleUpdateProfileButtonClick}
            isPending={uploadNewProfileMutation.isPending}
          />
        </Modal>
      )}
    </>
  )
}
