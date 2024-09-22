import React from "react";
import { cn } from "@/lib/utils";

export const Button = ({
  children,
  onClick,
  disable,
  className,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disable: boolean | undefined;
  className?: string;
}) => {
  return (
    <div>
      <button
        disabled={disable}
        onClick={onClick}
        className={cn(
          "bg-white text-black hover:bg-[#F5E876]  font-bold py-2 px-4 rounded",
          className
        )}
      >
        {children}
      </button>
    </div>
  );
};

export const TabButton = ({
  active,
  children,
  onClick,
  className,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
  className: string;
}) => {
  return (
    <div>
      <button
        onClick={onClick}
        className={cn(
          " w-full flex items-center align-middle py-4 px-3 justify-start  rounded-3xl hover:bg-white hover:text-black",
          className,
          active ? "bg-white text-black" : ""
        )}
      >
        {children}
      </button>
    </div>
  );
};
