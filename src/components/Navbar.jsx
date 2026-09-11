import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.webp";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [backdropBlurReady, setBackdropBlurReady] = useState(false);
  const navRef = useRef(null);
  const { itemCount } = useCart();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const links = [
    { name: "Home", href: "/" },
    
    { name: "Services", href: "/services" },
    { name: "Projects", href: "/projects" },
    { name: "Store", href: "/store" },
    { name: "Contact", href: "/contact" },
    { name: "About", href: "/about" },
  ];

  const submitSearch = (event) => {
    event.preventDefault();
    const value = search.trim();
    navigate(value ? `/store?search=${encodeURIComponent(value)}` : "/store");
    setOpen(false);
  };

  useEffect(() => {
    if (!open) {
      setBackdropBlurReady(false);
      return undefined;
    }
    const frame = window.requestAnimationFrame(() => setBackdropBlurReady(true));
    const closeOnOutsidePointer = (event) => {
      if (navRef.current?.contains(event.target) || event.target.closest("button[aria-label='Open menu'], button[aria-label='Close menu']")) return;
      setOpen(false);
    };
    document.addEventListener("pointerdown", closeOnOutsidePointer);
    return () => {
      window.cancelAnimationFrame(frame);
      document.removeEventListener("pointerdown", closeOnOutsidePointer);
    };
  }, [open]);

  return (
    <header onClick={() => { if (open) setOpen(false); }} className="sticky top-0 z-[70] rounded-b-2xl border-b border-slate-200/60 bg-white/80 backdrop-blur-sm md:fixed md:left-0 md:right-0 md:rounded-2xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative z-[75] flex min-h-16 items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
            {/* MOBILE MENU BUTTON */}
            <button
              type="button"
              onClick={() => setOpen(!open)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="order-first flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-900 shadow-sm transition hover:border-blue-300 hover:text-blue-600 md:hidden">
              <div className="flex flex-col gap-1.5">
                <span className="block h-0.5 w-5 rounded-full bg-slate-900" />
                <span className="block h-0.5 w-5 rounded-full bg-slate-900" />
                <span className="block h-0.5 w-3.5 self-end rounded-full bg-blue-600" />
              </div>
            </button>

            {/* LOGO + COMPANY NAME */}
            <Link
              to="/"
              className="flex min-w-0 items-center gap-2.5 sm:gap-3"
              onClick={() => setOpen(false)}>
            {/* Logo */}
            <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-slate-950 sm:h-11 sm:w-11">
              <img
                src={logo}
                alt="Harry Innovative Technologies Logo"
                className="h-full w-full object-contain"
              />

              {/* Subtle brand glow */}
              <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-white/10" />
            </div>

            {/* Company Name
                IMPORTANT:
                This is now visible on mobile.
            */}
            <div className="flex min-w-0 flex-col justify-center">
              <p className="whitespace-nowrap text-[12px] font-extrabold leading-tight tracking-tight text-slate-950 sm:text-base">
                Harry Innovative
              </p>

    <p className="whitespace-nowrap bg-gradient-to-r from-green-700 via-green-600 to-blue-700 bg-clip-text text-[9px] font-extrabold uppercase tracking-[0.12em] text-transparent sm:text-[10px] sm:tracking-[0.2em]">
  Technologies
</p>
            </div>
            </Link>
          </div>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden items-center gap-7 md:flex">
            <form onSubmit={submitSearch} className="flex min-w-0 items-center rounded-xl border border-slate-200 bg-slate-50 focus-within:border-blue-400 focus-within:bg-white">
              <label htmlFor="navbar-search" className="sr-only">Search products</label>
              <input id="navbar-search" type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search" className="w-24 min-w-0 bg-transparent px-3 py-2 text-sm outline-none lg:w-32" />
              <button type="submit" aria-label="Search products" className="px-3 py-2 text-sm font-bold text-blue-700 hover:text-blue-900">⌕</button>
            </form>
            {links.map((link) => (
              <NavLink
                key={link.name}
                to={link.href}
                end={link.href === "/"}
                className={({ isActive }) => `relative text-sm font-semibold transition duration-200 hover:text-blue-600 ${isActive ? "text-blue-600" : "text-slate-600"}`}>
                {link.name}
              </NavLink>
            ))}

            <Link to="/store/cart" aria-label={`Shopping cart with ${itemCount} items`} className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 text-lg text-slate-700 transition hover:border-blue-300 hover:text-blue-600">
              🛒
              {itemCount > 0 && <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-green-600 px-1 text-[10px] font-black text-white">{itemCount}</span>}
            </Link>

            {/* Get Quote */}
            <a
              href="/contact"
              className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-green-600 to-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/15 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-500/20">
              <span className="relative z-10">Get a Quote</span>

              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-blue-600 to-green-600 transition-transform duration-500 group-hover:translate-x-0" />
            </a>
          </nav>

          <div className="flex shrink-0 items-center gap-2 md:hidden">
            <Link to="/store/cart" aria-label={`Shopping cart with ${itemCount} items`} className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-900 shadow-sm transition hover:border-blue-300 hover:text-blue-600">
              <span aria-hidden="true">&#128722;</span>
              {itemCount > 0 && <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-green-600 px-1 text-[10px] font-black text-white">{itemCount}</span>}
            </Link>
          </div>
        </div>

        {/* MOBILE NAVIGATION */}
        {open && createPortal(
          <>
              <button type="button" aria-label="Close navigation" onClick={() => setOpen(false)} className={`fixed inset-x-0 bottom-0 top-16 z-[65] bg-slate-950/30 md:hidden ${backdropBlurReady ? "backdrop-blur-[2px]" : ""}`} />
            <nav ref={navRef} className="fixed left-0 top-16 z-[80] h-[calc(100dvh-4rem)] w-full max-w-xs overflow-y-auto overscroll-contain border-r border-slate-200 bg-white px-5 pb-8 pt-5 shadow-2xl md:hidden">
              <div className="flex flex-col gap-1">
              <form onSubmit={submitSearch} className="mb-3 flex items-center rounded-xl border border-slate-200 bg-slate-50 focus-within:border-blue-400 focus-within:bg-white">
                <label htmlFor="mobile-navbar-search" className="sr-only">Search products</label>
                <input id="mobile-navbar-search" type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search products" className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm outline-none" />
                <button type="submit" className="px-4 py-3 text-sm font-bold text-blue-700">Search</button>
              </form>
              {links.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.href}
                  end={link.href === "/"}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) => `rounded-xl px-4 py-3.5 font-semibold transition hover:bg-slate-50 hover:text-blue-600 ${isActive ? "bg-slate-50 text-blue-600" : "text-slate-700"}`}>
                  {link.name}
                </NavLink>
              ))}

              <Link to="/store/cart" onClick={() => setOpen(false)} className="flex items-center justify-between rounded-xl px-4 py-3.5 font-semibold text-slate-700 transition hover:bg-slate-50 hover:text-blue-600">Cart <span className="rounded-full bg-slate-950 px-2 py-0.5 text-xs text-white">{itemCount}</span></Link>

              {/* Mobile CTA */}
              <a
                href="/contact"
                onClick={() => setOpen(false)}
                className="mt-3 rounded-xl bg-gradient-to-r from-green-600 to-blue-600 px-5 py-3.5 text-center font-bold text-white shadow-lg shadow-blue-500/15 transition hover:shadow-xl">
                Get a Quote
              </a>
              </div>
            </nav>
          </>,
          document.body,
        )}
      </div>
    </header>
  );
}
