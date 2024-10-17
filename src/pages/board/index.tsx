import SearchSection from "@/components/board/SearchSection";
import BestBoardSection from "@/components/board/BestBoardSection";
import BoardSection from "@/components/board/BoardSection";
import AddBoardButton from "@/components/board/AddBoardButton";

export default function BoardsPage() {
  return (
    <>
      <div className="bg-[#17171C] min-h-screen">
        <div className="mx-auto w-[1200px] py-[100px]">
          <SearchSection />
          <BestBoardSection />
          <BoardSection />
          <AddBoardButton />
        </div>
      </div>
    </>
  );
}
