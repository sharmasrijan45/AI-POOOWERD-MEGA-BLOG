import React, { forwardRef, useId } from "react"

const Select = forwardRef(function Select({
    options,
    label,
    className = "",
    ...props
}, ref) {
    const id = useId()
    return (
        <div className="w-full">
            {label && <label className="inline-block mb-2 pl-1 font-semibold text-gray-200 text-sm" htmlFor={id}>{label}</label>}
            <select
                {...props}
                id={id}
                ref={ref}
                className={`px-4 py-2.5 rounded-lg text-white outline-none bg-slate-800 border border-purple-500/30 focus:border-purple-500 focus:shadow-lg focus:shadow-purple-500/30 duration-300 w-full ${className}`}
            >
                {options?.map((option) => (
                    <option key={option} value={option} className="bg-slate-800 text-white">
                        {option}
                    </option>
                ))}
            </select>
        </div>
    )
})

export default Select
