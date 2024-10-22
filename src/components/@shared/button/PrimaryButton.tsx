import classNames from "classnames";
import { Button } from "flowbite-react";
import { PropsWithChildren } from "react";

interface PrimaryButtonProps {
  active: boolean;
  onClick?: () => void;
  type: "button" | "submit" | "reset"; // 버튼 타입 정의
  disabled?: boolean;
}

export default function PrimaryButton({
  children,
  active,
  onClick,
  type,
  disabled = false,
}: PropsWithChildren<PrimaryButtonProps>) {
  //active에 boolean값을 넣어주세요
  return (
    <Button
      type={type}
      onClick={active && !disabled ? onClick : undefined} // active가 true이고 disabled가 false일 때만 onClick 실행
      disabled={disabled} // 버튼 비활성화
      className={classNames(
        "w-full h-[50px] md:h-[55px] xl:h-[65px] focus:ring-0",
        {
          "bg-gradation": active && !disabled,
          "bg-unactive": !active || disabled, // 비활성화 상태에 따른 스타일
        }
      )}
    >
      <span className="h-full flex items-center font-semibold text-lg">
        {children}
      </span>
    </Button>
  );
}
