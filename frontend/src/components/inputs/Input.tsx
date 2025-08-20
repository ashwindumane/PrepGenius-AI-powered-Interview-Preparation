import React from 'react'

interface InputProps {
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    label: string
    placeholder: string
    type: string
}

const Input: React.FC<InputProps> = ({ value, onChange, label, placeholder, type }) => {

    // const toggleShowPassword = () => {
    //     setShowPassword(!showPassword)
    // }
    return (
        <div>
            <label className='text-[16px] text-slate-800 p-1'>{label}</label>

            <div className='p-2'>
                <input type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(e)}
                    className='w-full bg-transparent outline-none border rounded pl-3 border-gray-400'
                />

                {/* {type === "password" && (
                    <>
                        {showPassword ? (
                            <FaRegEye
                                size={22}
                                className='text-primary cursor-pointer'
                                onClick={() => toggleShowPassword()}
                            />
                        ) : <FaRegEyeSlash
                            size={22}
                            className='text-slate-400 cursor-pointer'
                            onClick={() => toggleShowPassword()}
                        />}
                    </>
                )} */}

            </div>
        </div>
    )
}

export default Input