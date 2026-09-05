import SocialLinks from "./SocialLinks";
import logo from "../assets/logo.webp";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white">
                <img
                  src={logo}
                  alt="Harry Innovative Technologies Logo"
                  className="h-full w-full object-contain"
                />
              </div>

              <div>
                <p className="font-bold">Harry Innovative Technologies</p>

                <p className="text-sm text-slate-500">
                  Technology • Energy • Innovation
                </p>
              </div>
            </div>

            <p className="mt-6 max-w-lg leading-7 text-slate-400">
              We provide innovative technology, electrical, solar, security,
              automation and digital solutions for homes, businesses and
              organizations.
            </p>

            <a
              href="mailto:harryinnotech@gmail.com"
              className="mt-6 inline-block font-semibold text-white hover:text-slate-300">
              harryinnotech@gmail.com
            </a>
            <div className="mt-6">
            <p className="mb-3 text-sm font-bold text-slate-900">
              Follow Harry Innovative Technologies
            </p>

            <SocialLinks
              links={{
                facebook:
                  "https://www.facebook.com/profile.php?id=61552539832730",
                instagram: "https://www.instagram.com/harryinnotech/",
                youtube: "https://www.youtube.com/@HarryInnoTech",
              }}
            />
          </div>
          </div>
          
          <div>
            <h3 className="font-bold">Company</h3>

            <div className="mt-5 flex flex-col gap-3 text-slate-400">
              <a href="/" className="hover:text-white">
                Home
              </a>
              <a href="/about" className="hover:text-white">
                About
              </a>
              <a href="/services" className="hover:text-white">
                Services
              </a>
              <a href="/projects" className="hover:text-white">
                Projects
              </a>
              <a href="/contact" className="hover:text-white">
                Contact
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold">Services</h3>

            <div className="mt-5 flex flex-col gap-3 text-slate-400">
              <span>Solar Solutions</span>
              <span>Electrical Services</span>
              <span>Web Development</span>
              <span>CCTV & Security</span>
              <span>Electronics Repair</span>
              <span>Automation</span>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col justify-between gap-4 border-t border-slate-800 pt-7 text-sm text-slate-500 md:flex-row">
          <p>
            © {new Date().getFullYear()} Harry Innovative Technologies. All
            rights reserved.
          </p>

          <p>Benin City, Edo State, Nigeria</p>
        </div>
      </div>
    </footer>
  );
}
