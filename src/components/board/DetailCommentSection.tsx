import { ArticleComment } from '@/dtos/ArticleDto'
import CommentCard from '@/components/board/CommentCard'

export interface DetailCommentProps {
  data?: ArticleComment[]
  currentPage: number
  dataId: string | string[] | undefined
  userId: string | number | undefined
}

export default function DetailCommentSection({ data, currentPage, dataId, userId }: DetailCommentProps) {
  return (
    <div className="my-10">
      <div className="flex flex-col gap-4">
        {data && data.length > 0 ? (
          data?.map(data => (
            <CommentCard key={data.id} data={data} currentPage={currentPage} dataId={dataId} userId={userId} />
          ))
        ) : (
          // 임시 예외 처리
          <div className="text-brand-white">내용이 없습니다.</div>
        )}
      </div>
    </div>
  )
}
