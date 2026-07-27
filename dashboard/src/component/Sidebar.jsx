import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const navItems = [
  { name: 'Vault', to: '/vault' },
  { name: 'Password Health', to: '/password-health' },
  { name: 'Passkey Manager', to: '/passkey-manager' },
  { name: 'Settings', to: '/settings' },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gradient-to-br from-[#141E30] to-[#243B55-] text-black shadow-lg p-4 text-white space-y-6 flex flex-col justify-between">
      <div>
      <h1 className="text-2xl font-bold text-center mb-4"> PassRoom</h1>
      <nav className="space-y-3">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.to}
            className={({ isActive }) =>
              `block px-4 py-2 rounded transition-all duration-200 ${
                isActive ? 'bg-white/20' : 'hover:bg-white/10'
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
      </div>

      <button
        onClick={logout}
        className='px-4 rounded bg-red-500/20 hover:bg-red-500/40 border-red-500/40 transition'
      >
        Logout
      </button>
    </aside>
  );
}

