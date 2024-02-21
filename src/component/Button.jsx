import React from 'react'

function Button({type, className, name, onClick}) {
  return (
    <div>
      <button type={type} className={className} onClick={onClick}>
        {name}
      </button>
    </div>
  )
}

export default Button
