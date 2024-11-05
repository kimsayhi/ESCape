import { useRouter } from 'next/router'

export default function AddBoardButton() {
  const router = useRouter()

  const handleAddPage = () => {
    router.push('/addboard')
  }
  return (
    <button
      type="button"
      onClick={handleAddPage}
      className="fixed right-[calc((100%-375px)/2)] top-[85%] h-12 rounded-[40px] bg-gradation px-[21px] py-[14px] text-[16px] font-semibold leading-[19px] text-brand-white shadow-xl md:right-[calc((100%-768px)/2)] xl:right-[calc((100%-1200px)/2)]"
    >
      + 글쓰기
    </button>
  )
}
