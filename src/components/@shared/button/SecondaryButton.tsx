import classNames from "classnames";
import { Button } from "flowbite-react";
import { PropsWithChildren } from "react";

interface SecondaryButtonProps {
  active: boolean;
  onClick: () => void;
}

export default function SecondaryButton({
  children,
  active,
  onClick,
}: PropsWithChildren<SecondaryButtonProps>) {
  return (
    <Button
      onClick={active ? onClick : undefined}
      className={classNames(
        "w-full h-[50px] md:h-[55px]  relative xl-[65px] focus:ring-0",
        active ? "bg-gradation" : "bg-unactive enabled:hover:bg-unactive"
      )}
    >
      <span
        className={classNames(
          "absolute flex rounded-lg inset-0.5 bg-body-bg  text-transparent justify-center items-center",
          active ? "hover:bg-transparent hover:text-white" : ""
        )}
      >
        <span
          className={classNames(
            "font-semibold text-lg",
            active ? "bg-gradation bg-clip-text" : "text-brand-gray-dark"
          )}
        >
          {children}
        </span>
      </span>
    </Button>
  );
}
