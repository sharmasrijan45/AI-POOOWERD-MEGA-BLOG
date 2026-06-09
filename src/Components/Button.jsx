import React from 'react'

export default function Button({
    buttonText,
    type = "button",
    bgColor = "bg-gradient-to-r from-purple-600 to-purple-700",
    textColor = "text-white",
    className = "",
    children,
    ...props
}) {
  return (
    <button
      type={type}
      className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${bgColor} ${textColor} ${className}`}
      {...props}
    >
      {children || buttonText}
    </button>
  )
}