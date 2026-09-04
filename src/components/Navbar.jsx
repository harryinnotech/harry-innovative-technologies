import { useState } from "react";
import logo from "../assets/logo.webp";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { name: "Home", href: "/" },
    
    { name: "Services", href: "/services" },
    { name: "Projects", href: "/projects" },
    { name: "Contact", href: "/contact" },
    { name: "About", href: "/about" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-slate-200/60 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-20 items-center justify-between gap-2">
          {/* LOGO + COMPANY NAME */}
          <a
            href="/"
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
          </a>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden items-center gap-7 md:flex">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative text-sm font-semibold text-slate-600 transition duration-200 hover:text-blue-600">
                {link.name}
              </a>
            ))}

            {/* Get Quote */}
            <a
              href="/contact"
              className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-green-600 to-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/15 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-500/20">
              <span className="relative z-10">Get a Quote</span>

              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-blue-600 to-green-600 transition-transform duration-500 group-hover:translate-x-0" />
            </a>
          </nav>

          {/* MOBILE MENU BUTTON */}
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-900 shadow-sm transition hover:border-blue-300 hover:text-blue-600 md:hidden">
            {open ? (
              <span className="text-2xl font-light leading-none">×</span>
            ) : (
              <div className="flex flex-col gap-1.5">
                <span className="block h-0.5 w-5 rounded-full bg-slate-900" />
                <span className="block h-0.5 w-5 rounded-full bg-slate-900" />
                <span className="block h-0.5 w-3.5 self-end rounded-full bg-blue-600" />
              </div>
            )}
          </button>
        </div>

        {/* MOBILE NAVIGATION */}
        {open && (
          <nav className="border-t border-slate-100 py-5 md:hidden">
            <div className="flex flex-col gap-1">
              {links.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3.5 font-semibold text-slate-700 transition hover:bg-slate-50 hover:text-blue-600">
                  {link.name}
                </a>
              ))}

              {/* Mobile CTA */}
              <a
                href="/contact"
                onClick={() => setOpen(false)}
                className="mt-3 rounded-xl bg-gradient-to-r from-green-600 to-blue-600 px-5 py-3.5 text-center font-bold text-white shadow-lg shadow-blue-500/15 transition hover:shadow-xl">
                Get a Quote
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
