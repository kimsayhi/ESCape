import { Article } from '@/dtos/ArticleDto'
import MedalIcon from '@icons/medal_icon.svg'
import ProfileIcon from '@icons/profile_icon.svg'
import HeartIcon from '@icons/board_heart_icon.svg'
import Image from 'next/image'
import timeAgo from '@/utils/timeAgo'
import Link from 'next/link'

export interface BoardCardProps {
  like: Article
}

export default function BestBoardCard({ like }: BoardCardProps) {
  return (
    <div className="h-[220px] rounded-xl border-[1px] border-solid border-brand-black-light bg-brand-black-medium px-6 py-4">
      <div className="flex gap-1">
        <Image src={MedalIcon} alt="Best" />
        <p className="text-[16px] font-semibold leading-4 text-brand-white">Best</p>
      </div>
      <Link href={`/board/${like?.id}`}>
        <div className="flex gap-2.5">
          <p className="mt-3 line-clamp-2 h-[56px] w-full break-words text-[18px] font-medium leading-7 text-brand-white">
            {like?.title ? like.title : '제목이 들어가는 영역입니다.'}
          </p>
          {like.imageIdList.length !== 0 ? (
            <Image
              className="h-[72px] w-[72px] rounded-lg border-[1px] border-solid border-brand-black-light"
              src={`${process.env.NEXT_PUBLIC_BOARD_API_URL}/images/${like?.imageIdList.at(-1)}`}
              alt="게시물 이미지"
              width={72}
              height={72}
            />
          ) : null}
        </div>
      </Link>
      <p className="mt-3 text-[14px] font-medium leading-[17px] text-brand-gray-dark">{timeAgo(like?.createdAt)}</p>
      <div className="mt-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            className="h-8 w-8 rounded-full"
            src={like.writer.image === 'string' ? ProfileIcon : like.writer.image}
            alt="작성자 이미지"
            width={32}
            height={32}
          />
          <p className="line-clamp-1 max-w-[260px] break-words text-[14px] font-medium leading-[17px] text-brand-white">
            {like?.writer.nickname ? like.writer.nickname : '알 수 없음'}
          </p>
        </div>
        <div className="text-[14px] font-medium leading-[17px] text-brand-gray-dark">
          <div className="flex gap-1">
            <Image src={HeartIcon} alt="heart" />
            {like?.likeCount}
          </div>
        </div>
      </div>
    </div>
  )
}
