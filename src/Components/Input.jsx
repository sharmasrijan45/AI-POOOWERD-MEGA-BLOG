import React, { forwardRef, useId } from "react"

const Input = forwardRef(function Input({
    label ,
    type = 'text' ,
    className = '',
    ...props 
}, ref ){
const id = useId()
return (
    <div className="w-full">
        {label && (
            <label className="inline-block mb-2 pl-1 font-semibold text-gray-200 text-sm" htmlFor={id}>
                {label}
            </label>
        )}
        <input
        type={type}
        className={`px-4 py-2.5 rounded-lg text-white outline-none bg-slate-800 border border-purple-500/30 focus:border-purple-500 focus:shadow-lg focus:shadow-purple-500/30 duration-300 w-full placeholder-gray-500 ${className}`}
        ref={ref}
        {...props}
        id={id}
    />
    </div>
)
})

export default Input
