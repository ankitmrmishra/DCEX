import React from "react";

export const Button = ({
  children,
  onClick,
  disable
}: {
  children: React.ReactNode;
  onClick: () => void;
  disable:  boolean | undefined
}) => {
  return (
    <div >
      <button
       disabled={disable}
        onClick={onClick}
        className='bg-[#7f5af0] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
        {children}
      </button>
    </div>
  );
};

export const TabButton = ({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) => {
  return (
    <div>
      <button
        onClick={onClick}
        className={` hover:bg-[#ff6e6c] text-white font-bold py-2 px-4 rounded ${
          active ? "bg-[#ff6e6c]" : "bg-[#ff6f6c7b]"
        }`}>
        {children}
      </button>
    </div>
  );
};
