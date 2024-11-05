import classNames from 'classnames'
import { PropsWithChildren } from 'react'
import { match } from 'ts-pattern'

interface CustomButtonProps {
  active: boolean
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset' // 버튼 타입 정의
  styleType?: 'primary' | 'secondary' | 'tertiary'
  secondaryBg?: string
}

/** active에 boolean값을 넣어주세요
 *기본 style은 "primary"
 */
export default function CustomButton({
  children,
  active,
  onClick = () => {},
  type = 'button',
  styleType = 'primary',
  secondaryBg = 'bg-body-bg',
}: PropsWithChildren<CustomButtonProps>) {
  const btnClass = () =>
    match({ style: styleType, active })
      .with({ style: 'primary', active: true }, () => 'bg-gradation text-white')
      .with({ style: 'primary', active: false }, () => 'bg-unactive text-brand-gray-dark')
      .with({ style: 'secondary', active: true }, () => 'bg-gradation')
      .with({ style: 'secondary', active: false }, () => 'border-solid border-unactive text-brand-gray-dark')
      .with({ style: 'tertiary', active: true }, () => 'border-solid border-brand-gray-light')
      .with({ style: 'tertiary', active: false }, () => 'border-solid border-unactive text-brand-gray-dark')
      .otherwise(() => '')

  return (
    <button
      type={type}
      onClick={active ? onClick : undefined}
      className={classNames(
        'relative flex h-[50px] w-full items-center justify-center rounded-lg border text-lg font-semibold md:h-[55px] xl:h-[65px]',
        !active && 'cursor-not-allowed',
        btnClass(),
      )}
    >
      {styleType === 'secondary' && active ? (
        <span
          className={classNames(
            secondaryBg,
            'absolute bottom-[1px] left-[1px] right-[1px] top-[1px] flex items-center justify-center rounded-lg',
          )}
        >
          <span className="bg-gradation bg-clip-text text-transparent">{children}</span>
        </span>
      ) : (
        children
      )}
    </button>
  )
}
