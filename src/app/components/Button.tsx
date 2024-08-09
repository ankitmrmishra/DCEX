import React from "react";

export const Button = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) => {
  return (
    <div>
      <button
        onClick={onClick}
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
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
        className={` hover:bg-blue-500 text-white font-bold py-2 px-4 rounded ${
          active ? "bg-blue-700" : "bg-blue-300"
        }`}>
        {children}
      </button>
    </div>
  );
};
