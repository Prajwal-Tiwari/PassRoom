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
    <nav className="bg-white/10 backdrop-blur-md shadow-md border-b border-white/20 text-black fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center ">
        <h1 className="text-2xl font-semibold tracking-wide">PassRoom</h1>
        <ul className="flex gap-6 text-lg font-medium">
          <li>
            <Link to="/" className="hover:text-blue-600 transition duration-200">
              Home
            </Link>
          </li>
          <li>
            <Link to="/About" className="hover:text-blue-600 transition duration-200">
              About
            </Link>
          </li>
          <li>
            <Link to="/Contact" className="hover:text-blue-600 transition duration-200">
              Contact
            </Link>
          </li>
          <li>
            <Link to="/LogIn" className="hover:text-blue-600 transition duration-200">
              LogIn
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
