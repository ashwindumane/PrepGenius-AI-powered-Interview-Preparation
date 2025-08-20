import { Link } from 'react-router-dom'
import UserInfoCard from '../cards/UserInfoCard'

const Navbar = () => (
  <header className="sticky top-0 z-40 w-full bg-gradient-to-r from-[#fef7f0] via-[#fef7f0] to-[#f0f4ff] shadow">
    <div className="container mx-auto h-16 flex items-center justify-between px-4 md:px-0">
      <Link to="/dashboard">
        <span className="text-xl font-extrabold bg-gradient-to-r from-orange-500 to-amber-500 text-transparent bg-clip-text">
          Prep<span className="text-orange-400">Genius</span>
        </span>
      </Link>
      <UserInfoCard />
    </div>
  </header>
)

export default Navbar