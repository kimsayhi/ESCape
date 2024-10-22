import { getCategories } from '@/libs/axios/product/category'
import { useQuery } from '@tanstack/react-query'

interface SidebarProps {}

export default function Sidebar({}: SidebarProps) {
  const { data: categoryData } = useQuery({
    queryKey: ['category'],
    queryFn: getCategories,
  })

  return (
    <div className="hidden flex-col gap-[35px] pl-[30px] pt-[45px] md:flex md:w-[180px] xl:w-[220px]">
      <span>카테고리</span>
      {categoryData &&
        !!categoryData.length &&
        categoryData.map((menu) => (
          <span key={menu.id} className="text-brand-gray-dark">
            {menu.name}
          </span>
        ))}
    </div>
  )
}
