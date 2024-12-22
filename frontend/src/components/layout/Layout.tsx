import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

// Add proper TypeScript typing for children
const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link to="/" className="flex-shrink-0 flex items-center">
                StudentHub
              </Link>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link to="/academic-hub" className="px-3 py-2">Academic Hub</Link>
                <Link to="/campus-community" className="px-3 py-2">Campus Community</Link>
                <Link to="/platform-support" className="px-3 py-2">Platform Support</Link>
              </div>
            </div>
            <div className="flex items-center">
              <Link to="/login" className="px-3 py-2">Login</Link>
              <Link to="/register" className="px-3 py-2">Register</Link>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;