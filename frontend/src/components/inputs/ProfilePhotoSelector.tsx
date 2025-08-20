import React, { useRef, useState } from 'react'
import { LuTrash, LuUpload, LuUser } from 'react-icons/lu'

interface ProfilePhotoSelectorProps {
    image: File | null,
    setImage: (file: File | null) => void
    preview?: string | null
    setPreview?: (preview: string | null) => void

}

const ProfilePhotoSelector: React.FC<ProfilePhotoSelectorProps> = ({ image, setImage, preview, setPreview }) => {

    const inputRef = useRef<HTMLInputElement>(null)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file) {
            setImage(file);
            const previewUrl = URL.createObjectURL(file);

            if (setPreview) {
                setPreview(previewUrl);
            }
            setPreviewUrl(previewUrl);
        } else {
            setPreviewUrl(null);
        }
    };


    const handleRemoveImage = () => {
        setImage(null)
        setPreviewUrl(null)

        if (setPreview) {
            setPreview(null)
        }
    }

    const onChooseFile = () => {
        if (inputRef.current) {
            inputRef.current.click()
        }
    }

    return (
        <div className='flex justify-center mb-6'>
            <input type="file"
                accept='image/*'
                ref={inputRef}
                onChange={handleImageChange}
                className='hidden'
            />

            {!image ? (
                <div className='w-20 h-20 flex items-center justify-center bg-orange-50 full relative cursor-pointer rounded-full'>
                    <LuUser className='text-4xl text-orange-500' />
                    <button
                        type='button'
                        className='w-8 h-8 flex justify-center items-center bg-linear-to-r from-orange-500/85 to-orange-600 text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer'
                        onClick={onChooseFile}
                    >
                        <LuUpload />
                    </button>
                </div>
            )
                :
                <div className='relative'>
                    <img
                        src={preview || previewUrl || undefined} alt="profile"
                        className='w-20 h-20 rounded-full object-cover' />
                    <button
                        type='button'
                        onClick={handleRemoveImage}
                        className='w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer'
                    ><LuTrash /></button>

                </div>
            }
        </div>
    )
}

export default ProfilePhotoSelector