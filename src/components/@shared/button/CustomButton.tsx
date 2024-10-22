import classNames from 'classnames'
import { Button } from 'flowbite-react'
import { PropsWithChildren } from 'react'

type ButtonType =
  | { primary: true; secondary?: never; tertiary?: never }
  | { secondary: true; primary?: never; tertiary?: never }
  | { tertiary: true; primary?: never; secondary?: never }

interface CustomButtonProps {
  active: boolean
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset' // 버튼 타입 정의
  style?: 'primary' | 'secondary' | 'tertiary'
}

export default function CustomButton({
  children,
  active,
  onClick,
  type = 'button',
  style = 'primary',
}: PropsWithChildren<CustomButtonProps>) {
  /**active에 boolean값을 넣어주세요
   *기본 style은 "primary"
   */
  return (
    <>
      <Button
        type={type}
        onClick={active ? onClick : undefined} // active가 true일 때만 실행
        disabled={!active}
        className={classNames(
          'h-[50px] w-full focus:ring-0 md:h-[55px] xl:h-[65px]',
          active ? 'bg-gradation' : 'cursor-not-allowed bg-unactive enabled:hover:bg-unactive',
        )}
      >
        {style === 'primary' && <span className="flex h-full items-center text-lg font-semibold">{children}</span>}
        {style === 'secondary' && (
          <span
            className={classNames(
              'absolute inset-0.5 flex items-center justify-center rounded-lg bg-body-bg text-transparent',
              active ? 'hover:bg-transparent hover:text-white' : '',
            )}
          >
            <span
              className={classNames(
                'text-lg font-semibold',
                active ? 'bg-gradation bg-clip-text' : 'text-brand-gray-dark',
              )}
            >
              {children}
            </span>
          </span>
        )}
      </Button>
      {style === 'tertiary' && (
        <Button
          onClick={active ? onClick : undefined}
          className={classNames(
            'xl-[65px] relative h-[50px] w-full focus:ring-0 md:h-[55px]',
            active ? 'bg-brand-gray-light enabled:hover:bg-brand-gray-light' : 'bg-unactive enabled:hover:bg-unactive',
          )}
        >
          <span
            className={classNames(
              'absolute inset-0.5 flex items-center justify-center rounded-lg bg-body-bg text-lg font-semibold text-brand-gray-light',
              active ? 'hover:bg-brand-gray-light hover:text-white' : 'text-brand-gray-dark',
            )}
          >
            {children}
          </span>
        </Button>
      )}
    </>
  )
}
