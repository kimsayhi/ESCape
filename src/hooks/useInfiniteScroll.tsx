import { useEffect, useRef, useState } from 'react'

interface InfiniteScrollParams {
  loadMore: () => void
  hasMore: boolean
}
/** 무한스크롤 훅입니다, 반환값 targetRef를 화면 맨 아래요소에 배치하고
  인자로 loadMore(실행할 콜백), hasMore이 false가 되면 무한스크롤이 종료됩니다.
*/
const useInfiniteScroll = ({ loadMore, hasMore }: InfiniteScrollParams) => {
  const [scrollY, setScrollY] = useState(0)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const targetRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      entries => {
        entries.forEach(async entry => {
          if (entry.isIntersecting && hasMore) {
            saveScrollPosition()
            await loadMore()
            window.scrollTo(0, scrollY)
          }
        })
      },
      { threshold: 1.0 },
    )

    const currentTarget = targetRef.current

    if (currentTarget) {
      observerRef.current.observe(currentTarget)
    }

    return () => {
      if (currentTarget) {
        observerRef.current?.unobserve(currentTarget)
      }
      observerRef.current?.disconnect()
    }
  }, [loadMore, hasMore, scrollY])

  // 데이터 로드 전 스크롤 위치 저장
  const saveScrollPosition = () => {
    setScrollY(window.scrollY)
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [scrollY])

  return { targetRef }
}

export default useInfiniteScroll
