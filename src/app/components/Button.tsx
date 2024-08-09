import React from 'react'

export const Button = ({children, onClick}:{
    children: React.ReactNode, onClick: () => void
}) => {
  return (
    <div><button onClick={onClick} className="bg-orange-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
  {children}
</button></div>
  )
}

export const TabButton = ({active, children, onClick}:{
    active:boolean;children: React.ReactNode, onClick: () => void
}) => {
  return (
    <div><button onClick={onClick} className={` hover:bg-orange-400 text-white font-bold py-2 px-4 rounded ${active ? "bg-orange-700" : "bg-orange-300"}` }>
  {children}
</button></div>
  )
}

