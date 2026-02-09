import { Link, useLocation } from 'react-router-dom';
import { Plane } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/dataset', label: 'Dataset' },
    { path: '/prediction', label: 'Prediction' },
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/insights', label: 'Insights' },
    { path: '/about', label: 'About' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-[#0f172a] text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Plane className="w-8 h-8 text-[#38bdf8]" />
            <span className="text-xl font-bold">PropVision</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg transition-all ${
                  isActive(link.path)
                    ? 'bg-[#2563eb] text-white'
                    : 'text-gray-300 hover:bg-[#1e293b] hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
