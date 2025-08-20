import  {  useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LuSparkles } from 'react-icons/lu'
import { APP_FEATURE } from '../../utils/data'
import Login from '../auth/Login'
import Signup from '../auth/Signup'
import Modal from '../../components/Modal'

import UserInfoCard from '../../components/cards/UserInfoCard'
import { useUserContext } from '../../context/useUserContext'

const Landing = () => {
    const navigate = useNavigate()
    const { user } = useUserContext()
    // console.log(user)

    const [openAuthModel, setOpenAuthmodel] = useState(false)
    const [currentPage, setCurrentPage] = useState('login')

    const handleCTA = () => {

        if (!user) {
            setOpenAuthmodel(true)
        }
        else {
            navigate("/dashboard")
        }
    }
    return (
        <>
            <div className='w-full bg-[#161414]'>
                {/* <div className='w-[200px] h-[200px] bg-amber-100 blur-[25px] absolute right-0 top-20 rounded-3xl' /> */}

                <div className='container mx-auto px-4 pt-6 pb-[240px] relative z-10 '>
                    <header className='flex justify-between items-center mb-16'>
                        <div className='text-xl text-amber-100 tracking-wide font-bold'>
                            Interview Prep <span className='text-amber-400'>AI</span>
                        </div>
                        {user ?
                            (<UserInfoCard />)

                            :
                           ( <button className='bg-linear-to-r from-[#ff9324] to-[#ff99ab] text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-black hover:text-white  transition-colors cursor-pointer' onClick={() => setOpenAuthmodel(true)}>Login / Sign up

                            </button>)}
                    </header>


                    <div className="flex flex-col md:flex-row items-center">
                        <div className="w-full md:w-1/2 pr-4 mb-4 md:mb-0">
                            <div className="flex items-center justify-left mb-2 ">
                                <div className="flex items-center gap-2 text-[20px] text-amber-400 font-semibold bg-amber-100 px-3 rounded-full border border-amber-300">
                                    <LuSparkles /> AI Powered
                                </div>
                            </div>

                            <h1 className='text-5xl text-amber-100 font-medium mb-4 leading-tight'>Ace Interview with <br />
                                <span className='animate-text-shine text-transparent bg-clip-text bg-linear-65 from-yellow-400 to-amber-300  bg-[length:200%_200%]  font-semibold'>AI-Powered</span>{" "}
                                Learning
                            </h1>
                        </div>

                        <div className="w-full md:w-1/2">
                            <p className='text-[20px] text-amber-100 tracking-wide mr-0 md:mr-20 mb-6'>
                                Get role-specific questions, expand answers when you need them, dive deeper into concepts, and organize everything your way. From preparation to mastery - your ultimate interview toolkit is here.

                            </p>

                            <button
                                className='bg-black text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-yellow-100 hover:text-black border border-yellow-50 hover:border-yellow-300 transition-colors cursor-pointer'
                                onClick={handleCTA}
                            >Get Started</button>
                        </div>
                    </div>

                </div>

            </div>
            <div className='w-full  relative z-10 mb-56'>
                <div>


                    <section className='flex items-center justify-center -mt-36'>
                        <img src="./hero.png" alt=""
                            className='w-[80vw] rounded-lg'
                        />
                    </section>
                </div>

                <div className='w-full  bg-[#161414]  mt-10'>
                    <div className="container mx-auto px-4 pt-10 pb-20">
                        <section className='mt-5'>
                            <h2 className='text-2xl text-amber-100 tracking-wide font-medium text-center mb-12'>Features That Make you Shine</h2>

                            <div className='flex flex-col items-center gap-8'>

                                <div className='grid grid-cols-1 w-full md:grid-cols-3 gap-8'>
                                    {APP_FEATURE.map((feature) => {
                                        return <div key={feature.id} className='bg-[#FFFEF8]/80 p-6 rounded-xl shadow-xs hover:shadow-md shadow-amber-100 transition border border-amber-100'>
                                            <h3 className='text-base font-semibold b-3 '>{feature.title}</h3>
                                            <p className='text-gray-600'>{feature.description}</p>
                                        </div>
                                    })}
                                </div>
                            </div>


                        </section>
                    </div>
                </div>

                {/* <div className='text-sm bg-gray-50 text-secondary p-5 mt-5 text-center'>Happy Coding</div> */}

                <Modal
                    isOpen={openAuthModel}
                    onClose={() => {
                        setOpenAuthmodel(false)
                        setCurrentPage("login")
                    }}
                    hideHeader
                    title={currentPage}
                >
                    <div>
                        {currentPage === 'login' && (
                            <Login setCurrentPage={setCurrentPage} />
                        )}
                        {currentPage === 'signup' && (
                            <Signup setCurrentPage={setCurrentPage} />
                        )}
                    </div>
                </Modal>

            </div>
        </>

    )
}

export default Landing