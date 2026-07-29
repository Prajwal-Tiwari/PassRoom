import { Link, useNavigate  } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate =  useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="fixed top-0 z-50 w-full bg-slate-950/70 backdrop-blur-xl border-b border-white/10 shadow-lg text-slate-100">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center ">
        <h1 className="text-2xl font-bold tracking-wide text-blue-400 cursor-pointer">PassRoom</h1>
        <ul className="flex gap-6 text-lg font-medium">
          <li>
            <Link to="/" className="relative text-slate-300 hover:text-blue-400 transition-all duration-300 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-blue-400 after:transition-all after:duration-300 hover:after:w-full">
              Home
            </Link>
          </li>
          <li>
            <Link to="/About" className="relative text-slate-300 hover:text-blue-400 transition-all duration-300 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-blue-400 after:transition-all after:duration-300 hover:after:w-full">
              About
            </Link>
          </li>
          <li>
            <Link to="/Contact" className="relative text-slate-300 hover:text-blue-400 transition-all duration-300 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-blue-400 after:transition-all after:duration-300 hover:after:w-full">
              Contact
            </Link>
          </li>
          <li>
            <Link to="/Login" className="relative text-slate-300 hover:text-blue-400 transition-all duration-300 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-blue-400 after:transition-all after:duration-300 hover:after:w-full">
              Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
