import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';


const navItems = [
  { name: 'Vault', to: '/vault' },
  { name: 'Password Health', to: '/password-health' },
  { name: 'Password Manager', to: '/password-manager' },
  { name: 'Settings', to: '/settings' },
];

export default function Sidebar() {

  const { logout } = useAuth();

  return (
    <aside className="w-64 h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-blue-950 text-slate-200 border-r border-slate-700/40 shadow-2xl flex flex-col justify-between p-6">
      <div>
      <h1 className="text-3xl font-bold tracking-wide text-blue-400 mb-10"> PassRoom</h1>
      <nav className="space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-2 py-4 rounded-xl transition-all duration-200 ${
                isActive ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                    : "hover:bg-slate-800 hover:text-blue-300"
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
        className="flex items-center justify-center gap-2 py-3 rounded-xl bg-red-600/20 text-red-300 border border-red-500/40 hover:bg-red-600 hover:text-white transition-all duration-300"
      >
        Logout
      </button>
    </aside>
  );
}

