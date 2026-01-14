import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <>
      <nav className="relative bg-gradient-to-r from-teal-400 to-emerald-400 shadow-lg">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            {/* Mobile menu button */}
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button
                type="button"
                className="relative inline-flex items-center justify-center rounded-md p-2 text-white bg-teal-500/40 hover:bg-teal-500/60 hover:text-white focus:outline-2 focus:-outline-offset-1 focus:outline-white transition-colors"
                onClick={() => {
                  const menu = document.getElementById("mobile-menu");
                  menu?.classList.toggle("hidden");
                }}
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="size-6"
                >
                  <path
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            {/* Logo and Desktop Navigation */}
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <Link to="/" className="flex shrink-0 items-center">
                <img src="/heart.png" alt="Logo" className="h-8 w-auto" />
              </Link>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  <Link
                    to="/register"
                    className="rounded-md px-3 py-2 text-sm font-medium text-teal-900 hover:bg-teal-300/50 hover:text-teal-950 transition-colors"
                  >
                    Registrati
                  </Link>
                  <Link
                    to="/login"
                    className="rounded-md px-3 py-2 text-sm font-medium text-teal-900 hover:bg-teal-300/50 hover:text-teal-950 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/climate"
                    className="rounded-md px-3 py-2 text-sm font-medium text-teal-900 hover:bg-teal-300/50 hover:text-teal-950 transition-colors"
                  >
                    Climate
                  </Link>
                  <Link
                    to="/preferiti"
                    className="block rounded-md px-3 py-2 text-base font-medium text-teal-900 hover:bg-teal-300/50 hover:text-teal-950 transition-colors"
                  >
                    Preferiti
                  </Link>
                </div>
              </div>
            </div>

            {/* User Profile Section - Hidden on Mobile */}
            <Link
              to="/profilo"
              className="relative flex rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white hover:opacity-80 transition-opacity"
            >
              <span className="sr-only">Open user profile</span>
              <img
                src="/User.png"
                alt="Profile"
                className="size-8 rounded-full bg-white ring-2 ring-white/50 border border-green-950"
              />
            </Link>
          </div>
        </div>

        {/* Mobile menu */}
        <div id="mobile-menu" className="hidden sm:hidden">
          <div className="space-y-1 px-2 pt-2 pb-3 bg-teal-300/30">
            <Link
              to="/register"
              className="block rounded-md px-3 py-2 text-base font-medium text-teal-900 hover:bg-teal-300/50 hover:text-teal-950 transition-colors"
            >
              Registrati
            </Link>
            <Link
              to="/login"
              className="block rounded-md px-3 py-2 text-base font-medium text-teal-900 hover:bg-teal-300/50 hover:text-teal-950 transition-colors"
            >
              Login
            </Link>
            <Link
              to="/climate"
              className="block rounded-md px-3 py-2 text-base font-medium text-teal-900 hover:bg-teal-300/50 hover:text-teal-950 transition-colors"
            >
              Climate
            </Link>

            <Link
              to="/preferiti"
              className="block rounded-md px-3 py-2 text-base font-medium text-teal-900 hover:bg-teal-300/50 hover:text-teal-950 transition-colors"
            >
              Preferiti
            </Link>
            <Link
              to="/profilo"
              className="block rounded-md px-3 py-2 text-base font-medium text-teal-900 hover:bg-teal-300/50 hover:text-teal-950 transition-colors border-t border-teal-500/30 mt-2 pt-4"
            >
              Profile
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
