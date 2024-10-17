import HeaderSection from "@/components/addboard/HeaderSection";
import ContentSection from "@/components/addboard/ContentSection";

export default function AddBoardsPage() {
  return (
    <>
      <div className="bg-[#17171C] min-h-screen">
        <div className="mx-auto w-[1200px] py-[100px]">
          <HeaderSection />
          <ContentSection />
        </div>
      </div>
    </>
  );
}
