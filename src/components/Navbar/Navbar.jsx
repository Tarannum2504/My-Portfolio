import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { Search, Sun, Moon, Menu, X, ChevronDown } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";

export const Navbar = ({ onOpenNav, isNavOpen }) => {
  const { theme, toggleTheme } = useTheme();
  const [searchVal, setSearchVal] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const urlQuery = searchParams.get("q") || "";
  // Sync search input with URL query parameter when it changes in navigation
  useEffect(() => {
    setSearchVal(urlQuery);
  }, [urlQuery]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchVal.trim()) {
      navigate(`/projects?q=${encodeURIComponent(searchVal.trim())}`);
    } else {
      navigate("/projects");
    }
  };

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchVal(val);
    if (location.pathname === "/projects") {
      if (val.trim()) {
        navigate(`/projects?q=${encodeURIComponent(val.trim())}`, { replace: true });
      } else {
        navigate("/projects", { replace: true });
      }
    }
  };

  const navLinkClass = ({ isActive }) =>
    `font-mono text-[16px] uppercase tracking-widest transition-colors ${
      isActive ? "text-[#D4AF37]" : "text-[#999] hover:text-[#D4AF37]"
    }`;

  const moreLinks = [
    { label: "Training", to: "/training" },
    { label: "Certifications", to: "/certifications" },
    { label: "Achievements", to: "/achievements" },
    { label: "Infera AI", to: "/infera-ai" },
    { label: "Resume", to: "/resume" },
    { label: "Contact", to: "/contact" },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-40 py-4 bg-[#080808] border-b border-[#262626]">
      <div className="site-container flex items-center justify-between">
        {/* Left Side: Logo & Main Navigation */}
        <div className="flex items-center gap-10">
          <Link
            to="/"
            className="font-display text-2xl font-bold text-[#F5F5F5] tracking-tight hover:text-[#D4AF37] transition-colors"
          >
            TK
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8">
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/projects" className={navLinkClass}>
              Projects
            </NavLink>

            {/* Dropdown for More */}
            <div
              className="relative"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="font-mono text-[16px] uppercase tracking-widest text-[#999] hover:text-[#D4AF37] transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                More <ChevronDown size={13} className={`transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {dropdownOpen && (
                <div className="absolute left-0 top-full pt-1.5 w-56 z-50">
                  <div className="bg-[#0B0B0B] border border-[#222] rounded-xl py-3 shadow-2xl">
                    {moreLinks.map((l) =>
                      l.isDownload ? (
                        <a
                          key={l.label}
                          href={l.to}
                          download
                          className="block px-5 py-3 font-mono text-[16px] uppercase tracking-wider text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-colors"
                        >
                          {l.label}
                        </a>
                      ) : (
                        <NavLink
                          key={l.to}
                          to={l.to}
                          onClick={() => setDropdownOpen(false)}
                          className={({ isActive }) =>
                            `block px-5 py-3 font-mono text-[16px] uppercase tracking-wider transition-colors ${
                              isActive ? "text-[#D4AF37] bg-[#D4AF37]/5" : "text-[#999] hover:text-[#F5F5F5] hover:bg-[#111]"
                            }`
                          }
                        >
                          {l.label}
                        </NavLink>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
          </nav>
        </div>

        {/* Center: Search Bar */}
        <form onSubmit={handleSearchSubmit} className="flex-1 max-w-[320px] mx-4 relative">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#666]" strokeWidth={1.5} />
          <input
            type="text"
            value={searchVal}
            onChange={handleSearchChange}
            placeholder="Search Projects..."
            className="w-full bg-[#161616] border border-[#262626] rounded-full pl-12 pr-4 py-[10px] text-[16px] font-mono text-[#F5F5F5] placeholder-[#555] placeholder:text-[15px] outline-none focus:border-[#D4AF37]/60 transition-colors"
          />
        </form>

        {/* Right Side: Theme Toggle & Hamburger menu */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-full border border-[#222] flex items-center justify-center text-[#666] hover:text-[#D4AF37] hover:border-[#D4AF37]/40 transition-colors cursor-pointer"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={15} strokeWidth={1.5} /> : <Moon size={15} strokeWidth={1.5} />}
          </button>

          <button
            onClick={onOpenNav}
            aria-label="Open menu"
            className="lg:hidden w-9 h-9 rounded-full border border-[#222] flex items-center justify-center text-[#666] hover:text-[#D4AF37] hover:border-[#D4AF37]/40 transition-colors cursor-pointer"
          >
            {isNavOpen ? <X size={17} strokeWidth={1.5} /> : <Menu size={17} strokeWidth={1.5} />}
          </button>
        </div>
      </div>
    </div>
  );
};
