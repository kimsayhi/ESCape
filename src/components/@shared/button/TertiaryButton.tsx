import classNames from "classnames";
import { Button } from "flowbite-react";
import { PropsWithChildren } from "react";

interface TertiaryButtonProps {
  active: boolean;
  onClick: () => void;
}

export default function TertiaryButton({
  children,
  active,
  onClick,
}: PropsWithChildren<TertiaryButtonProps>) {
  return (
    <Button
      onClick={active ? onClick : undefined}
      className={classNames(
        "w-full h-[50px] md:h-[55px]  relative xl-[65px] focus:ring-0",
        active
          ? "bg-brand-gray-light enabled:hover:bg-brand-gray-light"
          : "bg-unactive enabled:hover:bg-unactive"
      )}
    >
      <span
        className={classNames(
          "absolute flex rounded-lg inset-0.5 font-semibold text-lg bg-body-bg  text-brand-gray-light justify-center items-center",
          active
            ? "hover:bg-brand-gray-light hover:text-white"
            : "text-brand-gray-dark"
        )}
      >
        {children}
      </span>
    </Button>
  );
}
