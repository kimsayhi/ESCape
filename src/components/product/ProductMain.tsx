import ProductList from './ProductList'

export default function ProductMain() {
  return (
    <div className="flex w-full flex-col gap-[60px] xl:max-w-[940px] xl:gap-[80px] xl:pt-[60px]">
      <ProductList productList={[]}>
        <div>
          지금 핫한 테마
          <span className="bg-gradation bg-clip-text text-transparent">TOP 6</span>
        </div>
      </ProductList>
      <ProductList productList={[]}>
        <div>별점이 높은 테마</div>
      </ProductList>
    </div>
  )
}
