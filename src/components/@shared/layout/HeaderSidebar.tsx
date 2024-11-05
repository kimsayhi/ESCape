import { CustomFlowbiteTheme, Drawer, Flowbite, Sidebar } from 'flowbite-react'

import Image from 'next/image'
import { CATEGORY_DATA } from '@/libs/constants/category'
import useRouteHandler from '@/hooks/useRouteHandler'
import { HiLogin, HiPencil } from 'react-icons/hi'
import { RxDotFilled } from 'react-icons/rx'
import { MdForum } from 'react-icons/md'
import { FaRegCircleUser } from 'react-icons/fa6'
import logoBig from '@images/logo_big_image.png'
import { useAuth } from '@/contexts/AuthProvider'

interface HeaderSidebarProps {
  handleSidebar: (active?: 'open' | 'close') => void
  isOpen: boolean
}

const customTheme: CustomFlowbiteTheme = {
  drawer: {
    root: { base: 'fixed z-40 scroll-hidden bg-white p-4 transition-transform' },
    header: {
      inner: {
        closeButton:
          'absolute end-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-unactive',
      },
    },
  },
  sidebar: {
    root: {
      inner: 'h-[100vh] mt-[30px] overflow-x-hidden rounded bg-body-bg px-3 py-4 ',
    },
    item: {
      base: 'flex items-center w-full justify-center rounded-lg p-2 text-base font-semibold text-gray-500 hover:bg-unactive hover:text-brand-gray-light',
    },
    itemGroup: {
      base: 'mt-4 space-y-2 border-t border-brand-gray-dark pt-4 first:mt-0 first:border-t-0 first:pt-0 dark:border-gray-700',
    },
  },
}
const LogoIcon = () => <Image src={logoBig} alt="로고" width={100} height={22} />

export default function HeaderSidebar({ handleSidebar, isOpen }: HeaderSidebarProps) {
  const { handleCategory, handleQueryReset } = useRouteHandler()
  const { user } = useAuth()
  return (
    <Flowbite theme={{ theme: customTheme }}>
      <Drawer
        onClose={() => {
          handleSidebar('close')
        }}
        open={isOpen}
        className="bg-body-bg"
      >
        <Drawer.Header titleIcon={LogoIcon} />
        <Sidebar>
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Sidebar.Item
                icon={RxDotFilled}
                onClick={() => {
                  handleQueryReset()
                  handleSidebar()
                }}
              >
                인기 테마
              </Sidebar.Item>
              {CATEGORY_DATA.map(
                menu =>
                  menu.name && (
                    <Sidebar.Item
                      icon={RxDotFilled}
                      onClick={() => {
                        handleCategory(menu.id)
                        handleSidebar()
                      }}
                      key={menu.id}
                    >
                      {menu.name}
                    </Sidebar.Item>
                  ),
              )}
            </Sidebar.ItemGroup>
            <Sidebar.ItemGroup>
              <Sidebar.Item href="/board" icon={MdForum}>
                자유게시판
              </Sidebar.Item>

              {user ? (
                <Sidebar.Item href="/mypage" icon={FaRegCircleUser}>
                  내 프로필
                </Sidebar.Item>
              ) : (
                <>
                  <Sidebar.Item href="/signin" icon={HiLogin}>
                    로그인
                  </Sidebar.Item>
                  <Sidebar.Item href="/signup" icon={HiPencil}>
                    회원가입
                  </Sidebar.Item>
                </>
              )}
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
      </Drawer>
    </Flowbite>
  )
}
