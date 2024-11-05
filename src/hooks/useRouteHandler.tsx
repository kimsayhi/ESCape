import { useRouter } from 'next/router'

const useRouteHandler = () => {
  const router = useRouter()
  const { category, keyword, order } = router.query
  const handleKeyword = (keyword: string) => {
    router.push({ pathname: '/product', query: { ...(category && { category }), keyword } })
  }

  const handleCategory = (category: number) => {
    router.push({ pathname: '/product', query: { ...(keyword && { keyword }), category } })
  }

  const handleQueryReset = () => {
    router.push('/product')
  }
  const handleOrder = (order: 'recent' | 'rating' | 'reviewCount') => {
    router.push({
      pathname: 'product',
      query: { ...(keyword && { keyword }), ...(category && { category }), order },
    })
  }

  return { handleKeyword, handleCategory, handleOrder, handleQueryReset, category, keyword, order }
}

export default useRouteHandler
