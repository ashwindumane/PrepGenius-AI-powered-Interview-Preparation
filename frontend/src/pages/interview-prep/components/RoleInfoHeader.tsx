import React from 'react'
import type { QuestionType } from '../../../utils/types'
interface RoleInforHeaderProps{
    role:string,
    topicToFocus:string,
    experience:number,
    questions?:QuestionType[],
    description:string,
    lastUpdated:string
}
const RoleInfoHeader: React.FC<RoleInforHeaderProps> = ({
    role,
    topicToFocus,
    experience,
    questions,
    lastUpdated
}) => {
    return (
        <div className='bg-white relative'>
            <div className='container mx-auto px-10 md:px-0'>
                <div className='h-[200px] flex flex-col justify-center relative z-10'>
                    <div className='flex items-start'>
                        <div className='flex-grow'>
                            <div className='flex justify-between items-start'>
                                <div>
                                    <h2 className="text-2xl font-medium text-white uppercase tracking-wide">{role}</h2>
                                    <p className='text-sm text-medium text-white mt-1 tracking-wide'>{topicToFocus}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='flex items-center gap-3 mt-4'>
                        <div className='text-sm font-semibold text-white bg-black px-3 py-1 rounded-full'>
                            Experience: {experience} {experience ==1 ? "Year" :"Years"}
                        </div>

                        <div className='text-sm font-semibold text-white bg-black px-3 py-1 rounded-full'>{questions?.length} Q&A</div>
                        <div className='text-sm font-semibold text-white bg-black px-3 py-1 rounded-full'>Last Updated: {lastUpdated}</div>


                    </div>
                </div>

                <div className="w-full h-[200px] flex items-center  bg-black overflow-hidden absolute top-0 left-0">
                    <div className="w-full h-24 bg-lime-400 blur-[65px] animate-blob1"></div>
                    <div className="w-full h-24 bg-teal-400 blur-[65px] animate-blob2"></div>
                    <div className="w-full h-24 bg-fuchsia-400 blur-[65px] animate-blob1"></div>
                    <div className="w-full h-24 bg-cyan-400 blur-[65px] animate-blob3"></div>
                </div>
            </div>
        </div>
    )
}

export default RoleInfoHeader