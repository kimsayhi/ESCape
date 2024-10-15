import DetailContentSection from "@/components/board/DetailContentSection";
import DetailPostCommentSection from "@/components/board/DetailPostCommentSection";
import DetailCommentSection from "@/components/board/DetailCommentSection";

export default function BoardDetailPage() {
  return (
    <div className="mx-auto w-[1200px] py-[100px]">
      <DetailContentSection />
      <DetailPostCommentSection />
      <DetailCommentSection />
    </div>
  );
}
