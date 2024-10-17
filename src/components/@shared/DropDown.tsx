import useToggle from "@/hooks/useToggle";
import React, { useEffect, useRef, ReactNode, ReactElement } from "react";

interface Props {
  children: ReactNode;
  width: string;
  buttonChildren: ReactNode;
  childType?: "menu" | "other";
}

/**
 * Dropdown 공통 컴포넌트
 * @param buttonChildren dropdown visible 값을 토글하는 버튼 디자인 컴포넌트
 * @param width dropdown box의 width 값
 * @param childType (optional) other: 우측정렬, menu: 가운데정렬 / default: menu
 */
export default function Dropdown({
  buttonChildren,
  children,
  width,
  childType = "menu",
}: Props) {
  const [isVisible, setIsVisible] = useToggle(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (!isVisible) {
        return;
      }
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsVisible();
      }
    }
    if (isVisible) {
      window.addEventListener("click", handleClickOutside);
    } else {
      window.removeEventListener("click", handleClickOutside);
    }

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [isVisible]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="flex w-full"
        type="button"
        onClick={() => {
          setIsVisible();
        }}
      >
        {buttonChildren}
      </button>
      {isVisible && (
        <button
          className={`absolute right-0 top-[calc(100%+6px)] z-40 m-0 flex flex-col items-center justify-center rounded-2xl border border-solid border-[#353542] bg-[#252530] px-1 py-1 ${width}`}
          onClick={() => setIsVisible()}
        >
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child as ReactElement, {
                className:
                  childType === "menu"
                    ? `flex w-full items-center justify-center rounded-xl py-2 text-[14px] font-normal text-[#f1f1f5] hover:bg-[#17171C]`
                    : `flex w-full items-center rounded-xl px-4 py-2 text-[14px] font-normal text-[#f1f1f5]`,
              });
            }
            return child;
          })}
        </button>
      )}
    </div>
  );
}
