import {useRouter} from "next/router";

export default function AddBoardButton() {
  const router = useRouter();

  const handleAddPage = () => {
    router.push("/addboard");
  }
  return (
    <button onClick={handleAddPage} className="fixed top-[85%] right-[calc((100%-1200px)/2)] h-12 rounded-[40px] py-[14px] px-[21px] shadow-xl font-semibold text-[16px] leading-[19px] bg-[#5363ff] text-[#f1f1f5]">
      + 글쓰기
    </button>
  )
}