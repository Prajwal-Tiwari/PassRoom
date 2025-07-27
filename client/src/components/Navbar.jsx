import { Link } from 'react-router-dom';


function Navbar() {
  return (
    <nav className="bg-blue-300 text-black w-full">
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
