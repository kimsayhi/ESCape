export default function HeaderSection() {
  return (
    <div className="flex justify-between items-center pb-6 border-b-[1px] border-solid border-[#353542]">
      <h1 className="font-bold text-[24px] text-[#f1f1f5] leading-6">
        게시글 쓰기
      </h1>
      <button className="w-[184px] h-12 rounded-xl py-[14px] shadow-xl font-semibold text-[16px] leading-[19px] bg-[#5363ff] text-[#f1f1f5]">
        등록
      </button>
    </div>
  )
}