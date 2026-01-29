import { Link } from "react-router-dom";

function Header() {
  return (
    <nav className="w-full bg-white/10 backdrop-blur-md border-b border-white/20">

      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

        <Link to="/" className="flex items-center gap-2">
          <img
            src="/logo.webp"
            alt="logo"
            className="h-10 w-10 rounded-full object-cover"
          />
          <span className="text-black font-bold text-lg">TodoApp</span>
        </Link>

        <div className="flex items-center gap-6 text-black font-medium">
          <Link
            to="/"
            className="hover:text-yellow-300 transition duration-200"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="hover:text-yellow-300 transition duration-200"
          >
            About
          </Link>
          <Link
            to="/login"
            className="px-4 py-2 bg-yellow-400 text-blue-900 rounded-lg font-semibold
            hover:bg-yellow-300 transition duration-200 shadow"
          >
            Login
          </Link>
        </div>

      </div>
    </nav>
  );
}

export default Header;
