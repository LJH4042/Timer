import React from 'react'

function Input({className, type, value, onChange, placeholder}) {
  return (
    <div>
      <input
        className={className}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  )
}

export default Input
