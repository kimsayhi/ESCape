import DetailContentSection from '@/components/board/DetailContentSection'
import DetailPostCommentSection from '@/components/board/DetailPostCommentSection'
import DetailCommentSection from '@/components/board/DetailCommentSection'
import { Router, useRouter } from 'next/router'
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getArticleDetail } from '@/libs/axios/board/getArticleDetail'
import BoardStatusScreen from '@/components/board/BoardStatusScreen'
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { getArticleDetailComments } from '@/libs/axios/board/getArticleDetailComments'
import { postComments } from '@/libs/axios/board/postComments'
import { CommentFormData } from '@/dtos/ArticleDto'
import PaginationSection from '@/components/board/PaginationSection'
import { useAuth } from '@/contexts/AuthProvider'

interface postCommentsProps {
  id: string | string[] | undefined
  comment: CommentFormData
}

export default function BoardDetailPage() {
  const [userId, setUserId] = useState<string | number | undefined>(undefined)
  const [comment, setComment] = useState('')
  const [commentError, setCommentError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const router = useRouter() as Router
  const { id } = router.query
  const queryClient = useQueryClient()
  const { user } = useAuth()

  // 유저 정보를 받아와서 useState 에 저장
  // 로그인 정보 없이 접속할 경우 로그인 페이지로 리디렉션
  useEffect(() => {
    if (!user) {
      router.push('/signin')
    } else {
      setUserId(user.id)
    }
  }, [user, router])

  // 상세 페이지를 보기위한 useQuery
  // useRouter 가 클라이언트 사이드에서만 제대로 작동하기 때문에 준비가 완료되었을 때 호출하기 위해 enabled 사용
  const { data: articleDetailData } = useQuery({
    queryKey: ['articleDetail', id, userId],
    queryFn: () => getArticleDetail(id, String(user?.id)),
    enabled: !!id,
  })

  // 페이지네이션을 위한 댓글 useQuery
  const {
    data: articleDetailCommentsData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['articleDetailComments', id, currentPage],
    queryFn: () => getArticleDetailComments({ id, currentPage }),
    enabled: !!id,
    placeholderData: keepPreviousData,
  })

  // 페이지네이션 이동을 위한 이벤트 핸들러
  const handlePageClick = (page: number) => {
    setCurrentPage(page)
  }

  // 댓글 전송을 위한 useMutation
  const commentPostMutation = useMutation({
    mutationFn: (newComment: postCommentsProps) => postComments(newComment),
    onSuccess: async () => {
      try {
        await queryClient.invalidateQueries({ queryKey: ['articleDetailComments', id, currentPage] })
        await queryClient.invalidateQueries({ queryKey: ['articleDetail', id] })
      } catch (e) {
        console.error(e)
      }
    },
  })

  // 댓글 유효성 검사
  const validateComment = (comment: string) => {
    if (!comment) {
      setCommentError('댓글을 입력해주세요.')
      return false
    }
    if (comment.length > 300) {
      setCommentError('댓글은 300자 미만이어야 합니다.')
      return false
    }
    setCommentError(null)
    return true
  }

  // 댓글 내용이 변경될 때 유효성 검사를 실시하기 위한 이벤트 핸들러
  const handleCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newComment = e.target.value
    setComment(newComment)
    validateComment(newComment)
  }

  // comment 를 전송하기 위한 이벤트 핸들러
  const handleCommentSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (!validateComment(comment)) {
      return
    }

    const newComment = { id, comment: { userId: userId as number, content: comment } }
    commentPostMutation.mutate(newComment)
    setComment('')
  }

  // Fetch 가 필요한 곳에 내려주기 위한 이벤트 핸들러
  const handleRefetch = () => {
    queryClient.invalidateQueries({ queryKey: ['articleDetail', id, userId] })
  }

  // 임시 로딩 & 에러 처리
  if (isLoading) return <BoardStatusScreen>Loading...</BoardStatusScreen>
  if (isError) return <BoardStatusScreen>Error!</BoardStatusScreen>

  return (
    <div className="relative mx-4 py-[100px] md:mx-6 xl:mx-auto xl:w-[1200px]">
      <DetailContentSection data={articleDetailData} userId={userId} reFetch={handleRefetch} />
      <form onSubmit={handleCommentSubmit}>
        <DetailPostCommentSection
          comment={comment}
          commentError={commentError}
          setComment={handleCommentChange}
          value="댓글 쓰기"
        />
      </form>
      <DetailCommentSection
        data={articleDetailCommentsData?.articleComments}
        dataId={id}
        currentPage={currentPage}
        userId={userId}
      />
      <PaginationSection
        totalPageCount={articleDetailCommentsData?.totalCount}
        currentPage={currentPage}
        onPageClick={handlePageClick}
      />
    </div>
  )
}
