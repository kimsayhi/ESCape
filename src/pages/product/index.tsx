import ProductMain from '@/components/product/ProductMain'
import ReviewerRanking from '@/components/product/ReviewerRanking'
import Sidebar from '@/components/product/Sidebar'

export default function ProductPage() {
  return (
    <main className="flex justify-center">
      <Sidebar />
      <div className="flex flex-grow flex-col gap-[60px] px-5 pt-[30px] md:pl-[25px] md:pr-[30px] md:pt-10 xl:flex-grow-0 xl:flex-row-reverse xl:justify-end xl:pr-0 xl:pt-0">
        <ReviewerRanking />
        <ProductMain />
      </div>
    </main>
  )
}
