import {Router} from "next/router";
import {Article} from "@/dtos/ArticleDto";
import KebabIcon from "../../../public/icons/kebab_icon.svg"
import ProfileIcon from "../../../public/icons/profile_icon.svg"
import HeartIcon from "../../../public/icons/heart_icon.svg"
import Image from "next/image";
import timeAgo from "@/utils/TimeAgo";
import Dropdown from "@/components/@shared/DropDown";

export interface BoardCardProps {
  router?: Router;
  data?: Article;
}

export default function BoardCard({ router, data }: BoardCardProps) {

  const handleDetailPage = () => {
    router?.push(`/board/${data?.id}`)
  }

  return (
    <div className="w-[590px] h-[176px] bg-[#252530] rounded-xl border-[1px] border-solid border-[#353542] py-4 px-6 cursor-pointer" onClick={handleDetailPage}>
      <div className="flex gap-2.5 justify-between">
        <p className="max-w-[360px] text-[18px] leading-7 font-medium text-[#f1f1f5] w-full break-words line-clamp-2">
          {data?.title ? data.title : "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"}
        </p>
        <div>
          {data?.image ? (<Image className="w-[72px] h-[72px] rounded-lg border-[1px] border-solid border-[#353542]" src={data.image} alt="게시물 이미지" />) : null}
          <Dropdown width="w-[120px]" buttonChildren={<div><Image src={KebabIcon} alt="수정 & 삭제하기" width={24} height={24} /></div>}>
            <button>
              수정하기
            </button>
            <button>
              삭제하기
            </button>
          </Dropdown>
        </div>
      </div>
      <div className="flex mt-12 items-center justify-between">
        <div className="flex gap-3 items-center">
          <Image src={ProfileIcon} alt="작성자 이미지"/>
          <p className="max-w-[260px] text-[14px] leading-[17px] text-[#f1f1f5] font-medium break-words line-clamp-1 pr-1">
            {data?.writer.nickname ? data.writer.nickname : "알 수 없음"}
          </p>
          <p className="text-[14px] leading-[17px] font-medium text-[#6e6e82] pl-4 border-l-[1px] border-solid border-[#353542]">
            {timeAgo(data?.createdAt)}
          </p>
        </div>
        <div className="text-[14px] leading-[17px] font-medium text-[#6e6e82]">
          {data?.likeCount ? (<div className="flex gap-1"><Image src={HeartIcon} alt="heart" />{data.likeCount}</div>) : (<div className="flex gap-1"><Image src={HeartIcon} alt="heart" />{"0"}</div>)}
        </div>
      </div>
    </div>
  )
}