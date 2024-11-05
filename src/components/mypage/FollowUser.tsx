import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import defaultProfileImage from '@images/user_default.svg'
import { CommonUserTypes } from '@/dtos/UserDto'

interface FollowUserProps {
  followUserData: CommonUserTypes
}

export default function FollowUser({ followUserData }: FollowUserProps) {
  const { id, image, nickname } = followUserData || {}

  const profileImage = typeof image === 'string' && image ? image : defaultProfileImage

  return (
    <Link className="flex content-start items-center gap-5" href={`/user/${id}`}>
      <div className="relative h-[48px] w-[48px] overflow-hidden rounded-full">
        <Image className="object-cover" fill src={profileImage} alt="프로필 이미지" />
      </div>
      <p className="text-base font-medium xl:text-lg">{nickname}</p>
    </Link>
  )
}
