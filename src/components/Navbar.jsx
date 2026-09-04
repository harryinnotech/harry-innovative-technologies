import { useState } from "react";
import logo from "../assets/logo.png";
export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Projects", href: "/projects" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex h-20 items-center justify-between">

          {/* =====================================================
              LOGO
              Replace the "HIT" box with your real logo later.
              Example:
              <img src="/images/logo.png" ... />
          ===================================================== */}
          <a href="/" className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-950">
              <span className="font-bold text-white"><img src={logo} alt="Logo" className="h-full w-full object-contain"/></span>
            </div>

            <div className="hidden sm:block">
              <p className="font-extrabold leading-none tracking-tight text-slate-950">
                Harry Innovative
              </p>

              <p className="mt-1 text-xs font-medium tracking-[0.2em] text-slate-500 uppercase">
                Technologies
              </p>
            </div>
          </a>

          {/* DESKTOP NAV */}
          <nav className="hidden items-center gap-8 md:flex">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-semibold text-slate-600 transition hover:text-slate-950"
              >
                {link.name}
              </a>
            ))}

            <a
              href="/contact"
              className="rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
            >
              Get a Quote
            </a>
          </nav>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setOpen(!open)}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 text-xl md:hidden"
          >
            {open ? "×" : "☰"}
          </button>
        </div>

        {/* MOBILE NAV */}
        {open && (
          <nav className="border-t border-slate-100 py-5 md:hidden">
            <div className="flex flex-col gap-4">
              {links.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="font-semibold text-slate-700"
                >
                  {link.name}
                </a>
              ))}

              <a
                href="/contact"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-xl bg-slate-950 px-5 py-3 text-center font-bold text-white"
              >
                Get a Quote
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}