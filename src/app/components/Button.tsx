import React from 'react'

const Button = ({children, onClick}:{
    children: React.ReactNode, onClick: () => void
}) => {
  return (
    <div><button onClick={onClick} className="bg-orange-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
  {children}
</button></div>
  )
}

export default Button