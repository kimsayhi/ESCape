import Dropdown from "@/components/@shared/DropDown";
import Image from "next/image";
import ToggleIcon from "../../../public/icons/toggle_icon.svg"
import {useState} from "react";
import BoardCard from "@/components/board/BoardCard";

export default function BoardSection() {
  const [selectedOption, setSelectedOptions] = useState("최신순");
  
  return (
    <>
      <div className="flex justify-between items-center mt-10">
        <h2 className="font-bold text-[20px] leading-6 text-[#f1f1f5]">
          게시글
        </h2>
        <Dropdown width="w-[120px]" buttonChildren={<div
          className="w-[120px] bg-[#252530] rounded-xl border-[1px] border-solid border-[#353542] text-[#f1f1f5] py-2.5 px-[14px] flex justify-between items-center">{selectedOption}<Image
          src={ToggleIcon} alt="메뉴 열기"/></div>}>
          <button onClick={() => setSelectedOptions("최신순")}>
            최신순
          </button>
          <button onClick={() => setSelectedOptions("인기순")}>
            인기순
          </button>
        </Dropdown>
      </div>
      <div className="relative py-9">
        <BoardCard />
      </div>
    </>
  )
}