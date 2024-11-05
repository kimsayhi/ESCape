import useRouteHandler from '@/hooks/useRouteHandler'
import classNames from 'classnames'
import { CATEGORY_DATA } from '@/libs/constants/category'

export default function CategoryList() {
  const { handleCategory, handleQueryReset, category } = useRouteHandler()

  return (
    <div className="hidden shrink-0 flex-col items-start pl-[30px] pt-[45px] md:flex md:w-[150px] xl:w-[220px]">
      <span className="pb-5 pl-5">카테고리</span>
      <button
        onClick={() => {
          handleQueryReset()
        }}
        className={classNames(
          'flex h-[45px] w-full items-center rounded-lg pl-5 xl:h-[50px]',
          !category ? 'bg-unactive' : 'text-brand-gray-dark',
        )}
      >
        인기 테마
      </button>
      {CATEGORY_DATA.map(
        menu =>
          menu.name && (
            <button
              onClick={() => {
                handleCategory(menu.id)
              }}
              key={menu.id}
              className={classNames(
                'flex h-[45px] w-full items-center rounded-lg pl-5 xl:h-[50px]',
                Number(category) === menu.id ? 'bg-unactive' : 'text-brand-gray-dark',
              )}
            >
              {menu.name}
            </button>
          ),
      )}
    </div>
  )
}
