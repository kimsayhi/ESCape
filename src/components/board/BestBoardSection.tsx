import BestBoardCard from "@/components/board/BestBoardCard";

export default function BestBoardSection() {
  return (
    <>
      <div className="flex justify-between items-center mt-10">
        <h2 className="font-bold text-[20px] leading-6 text-[#f1f1f5]">
          베스트 게시글
        </h2>
        <button className="font-normal text-[14px] leading-[17px] text-[#6e6e82]">
          더보기 {'>'}
        </button>
      </div>
      <div className="relative py-10 border-b-[1px] border-solid border-[#353542]">
        <BestBoardCard />
      </div>
    </>
  )
}