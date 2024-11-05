import { getUsersRanking } from '@/libs/axios/product/reviewRankingApi'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import defaultProfile from '@images/logo_small_image.png'
import { match } from 'ts-pattern'
import classNames from 'classnames'
import Link from 'next/link'

export default function ReviewerRanking() {
  const { data: rankData } = useQuery({ queryKey: ['userRank'], queryFn: getUsersRanking })

  const rankingColor = ({ rank }: { rank: number }) =>
    match({ rank })
      .with({ rank: 1 }, () => 'text-brand-pink bg-brand-pink ')
      .with({ rank: 2 }, () => 'text-brand-green bg-brand-green ')
      .otherwise(() => 'text-brand-gray-light bg-brand-gray-light')
  return (
    <div className="w-100vw-sm flex w-[100vw] shrink-0 grow flex-nowrap gap-5 border-l border-[#282530] md:w-auto xl:justify-center xl:gap-[30px] xl:pt-[45px]">
      <div className="flex flex-col">
        <div className="flex flex-col gap-5 xl:gap-[30px]">
          <div className="text-sm xl:text-base">리뷰어 랭킹</div>
          <div className="w-100vw-sm scroll-hidden flex gap-[15px] pr-5 md:w-auto md:gap-5 xl:flex-col xl:gap-[30px]">
            {rankData?.slice(0, 5).map((user, index) => (
              <Link href={`user/${user.id}`} key={user.id} className="flex shrink-0 items-center gap-2.5">
                <span className="relative h-[36px] w-[36px] overflow-hidden rounded-full">
                  <Image fill src={user.image || defaultProfile} alt="프로필이미지" />
                </span>
                <div className="flex flex-col gap-[5.5px]">
                  <div className="flex items-center gap-[5px]">
                    <span
                      className={classNames(
                        'flex h-[16px] w-[26px] shrink-0 items-center justify-center rounded-[50px] bg-opacity-10 text-[10px]',
                        rankingColor({ rank: index + 1 }),
                      )}
                    >
                      {index + 1}등
                    </span>
                    <span>{user.nickname}</span>
                  </div>
                  <div className="flex gap-2.5 text-[10px] font-light text-brand-gray-dark">
                    <span> 팔로워 {user.followersCount}</span>
                    <span> 리뷰 {user.reviewCount}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
