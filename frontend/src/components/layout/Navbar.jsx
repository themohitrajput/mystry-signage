import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Menu, Moon, Sun, X } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/categories", label: "Categories" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar({ siteName = "Mistry Signage", logo }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState(
    () => document.documentElement.getAttribute("data-theme") || "dark",
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.style.colorScheme = theme;
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-300 ${
        scrolled
          ? "bg-ink/95 backdrop-blur border-b border-ash/10"
          : "bg-transparent"
      }`}
    >
      <nav className="container-page flex items-center justify-between py-4">
        <NavLink
          to="/"
          className="flex items-center gap-2 font-display text-lg text-paper"
        >
          {logo ? (
            <img src={logo} alt={siteName} className="h-9 w-auto" />
          ) : (
            <span className="tube-underline text-amber text-glow-amber">
              Mistry<span className="text-paper">SIGNAGE</span>
            </span>
          )}
        </NavLink>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  `font-body text-sm font-medium tracking-wide transition-colors ${
                    isActive ? "text-amber" : "text-paper/80 hover:text-cyan"
                  }`
                }
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() =>
              setTheme((current) => (current === "dark" ? "light" : "dark"))
            }
            className="hidden rounded-full border border-ash/30 bg-panel/70 p-2 text-paper transition hover:border-amber hover:text-amber md:inline-flex"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <NavLink
            to="/contact"
            className="btn-primary hidden md:inline-flex !py-2.5 !px-5 text-sm"
          >
            Get a Quote
          </NavLink>

          <button
            className="text-paper md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-ash/10 bg-ink md:hidden">
          <ul className="container-page flex flex-col gap-1 py-4">
            {links.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  end={l.to === "/"}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block rounded-md px-3 py-3 text-base font-medium ${
                      isActive ? "bg-panel text-amber" : "text-paper/85"
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
            <li className="mt-2 flex items-center justify-between gap-2 rounded-md border border-ash/20 bg-panel/70 px-3 py-3">
              <span className="text-sm font-medium text-paper/85">Theme</span>
              <button
                type="button"
                onClick={() =>
                  setTheme((current) => (current === "dark" ? "light" : "dark"))
                }
                className="rounded-full border border-ash/30 bg-panel p-2 text-paper transition hover:border-amber hover:text-amber"
                aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </li>
            <li>
              <NavLink
                to="/contact"
                onClick={() => setOpen(false)}
                className="btn-primary mt-2 w-full"
              >
                Get a Quote
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
