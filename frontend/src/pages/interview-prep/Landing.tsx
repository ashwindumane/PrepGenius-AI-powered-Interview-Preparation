import { useState } from 'react'
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

  const [openAuthModel, setOpenAuthmodel] = useState(false)
  const [currentPage, setCurrentPage] = useState('login')

  const handleCTA = () => {
    if (!user) setOpenAuthmodel(true)
    else navigate('/dashboard')
  }

  return (
    <>
      {/* hero */}
      <div className="w-full bg-gradient-to-br from-[#fef7f0] via-[#fef7f0] to-[#f0f4ff] relative">
        <div className="container mx-auto px-6 pt-6 pb-28">
          <header className="flex justify-between items-center mb-16">
            <h1 className="text-2xl font-extrabold text-orange-500">
              Prep<span className="text-orange-400">Genius</span>
            </h1>

            {user ? (
              <UserInfoCard />
            ) : (
              <button
                onClick={() => setOpenAuthmodel(true)}
                className="bg-gradient-to-r from-orange-400 to-orange-500 text-sm font-semibold text-white px-6 py-2.5 rounded-full shadow-md hover:opacity-90 transition"
              >
                Login / Sign Up
              </button>
            )}
          </header>

          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 text-sm text-orange-500 font-medium bg-orange-100/20 px-4 py-1 rounded-full border border-orange-500/30">
              <LuSparkles /> AI Powered
            </span>

            <h2 className="text-5xl font-bold text-gray-900 leading-tight my-6">
              Ace Interview with <br />
              <span className="bg-gradient-to-r from-orange-500 to-amber-500 text-transparent bg-clip-text">
                AI-Powered
              </span>{' '}
              Learning
            </h2>

            <p className="text-lg text-gray-700 mb-8">
              Get role-specific questions, expand answers when you need them, dive deeper into
              concepts, and organize everything your way. From preparation to mastery—your ultimate
              interview toolkit is here.
            </p>

            <button
             onClick={handleCTA}
            className="relative z-20 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold px-7 py-3 rounded-full shadow-md hover:opacity-90 transition transform -translate-y-2">
            Get Started
            </button> 
          </div>
        </div>

        {/* hero image */}
        <div className="w-full flex justify-center -mt-36 pb-10">
          <img
            src="./hero.png"
            alt="hero"
            className="w-[80vw] max-w-5xl rounded-lg shadow-2xl"
          />
        </div>
      </div>

      {/* features */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-6">
          <h3 className="text-3xl font-semibold text-center text-gray-900 mb-14">
            Features That Make You Shine
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {APP_FEATURE.map((feature) => (
              <div
                key={feature.id}
                className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm hover:shadow-lg transition"
              >
                <h4 className="text-lg font-semibold text-gray-900 mb-3">{feature.title}</h4>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* auth modal */}
      <Modal
        isOpen={openAuthModel}
        onClose={() => {
          setOpenAuthmodel(false)
          setCurrentPage('login')
        }}
        hideHeader
        title={currentPage}
      >
        {currentPage === 'login' && <Login setCurrentPage={setCurrentPage} />}
        {currentPage === 'signup' && <Signup setCurrentPage={setCurrentPage} />}
      </Modal>
    </>
  )
}

export default Landing