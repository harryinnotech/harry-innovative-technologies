import { Link } from "react-router-dom";

const services = [
  {
    title: "Web Development",
    description:
      "Modern, responsive websites and digital platforms built to help businesses grow.",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=85",
    number: "01",
  },
  {
    title: "Solar Installation",
    description:
      "Reliable solar power systems designed for homes, offices and businesses.",
    image:
      "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1200&q=85",
    number: "02",
  },
  {
    title: "Electrical Services",
    description:
      "Professional electrical installation, wiring, maintenance and troubleshooting.",
    image:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=85",
    number: "03",
  },
  {
    title: "CCTV & Security",
    description:
      "Smart surveillance solutions that help you monitor and protect what matters.",
    image:
      "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=1200&q=85",
    number: "04",
  },
];

const stats = [
  { value: "7+", label: "Core Services" },
  { value: "24/7", label: "Support Mindset" },
  { value: "100%", label: "Commitment" },
];

export default function Home() {
  return (
    <main className="bg-white text-slate-950">
      {/* =====================================================
          HERO SECTION
          Replace the stock image below with your own company/
          project photo later if you want.
          ===================================================== */}
      <section className="relative min-h-[calc(100vh-80px)] overflow-hidden bg-slate-950">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=2000&q=90"
            alt="Technology circuit board"
            className="h-full w-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/30" />
        </div>

        <div className="relative mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl items-center px-6 py-20 lg:px-8">
          <div className="max-w-4xl">
            <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">
                Technology • Power • Innovation
              </span>
            </div>

            <h1 className="max-w-4xl text-5xl font-black leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-8xl">
              We build
              <span className="block text-sky-400">smarter solutions.</span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
              Harry Innovative Technologies delivers practical technology,
              electrical, solar and security solutions for homes and
              businesses.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link
                to="/services"
                className="inline-flex items-center justify-center rounded-xl bg-sky-500 px-7 py-4 text-sm font-bold text-white shadow-lg shadow-sky-500/20 transition hover:bg-sky-400"
              >
                Explore Our Services
                <svg
                  className="ml-2 h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14" />
                  <path d="m13 6 6 6-6 6" />
                </svg>
              </Link>

              <a
                href="https://wa.me/23490966218520"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 px-7 py-4 text-sm font-bold text-white backdrop-blur transition hover:bg-white/10"
              >
                Talk to Us on WhatsApp
              </a>
            </div>

            <div className="mt-14 grid max-w-xl grid-cols-3 gap-6 border-t border-white/10 pt-7">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-black text-white sm:text-3xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-wider text-slate-400">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 right-8 hidden items-center gap-3 text-xs uppercase tracking-[0.2em] text-slate-500 lg:flex">
          <span>Scroll to explore</span>
          <span className="h-px w-10 bg-slate-600" />
        </div>
      </section>

      {/* =====================================================
          INTRO / TRUST SECTION
          ===================================================== */}
      <section className="border-b border-slate-100 bg-white py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[1fr_1.5fr] lg:px-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-sky-500">
              What we do
            </p>

            <h2 className="mt-4 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
              One company.
              <span className="block text-slate-400">
                Multiple solutions.
              </span>
            </h2>
          </div>

          <div>
            <p className="text-lg leading-8 text-slate-600">
              From websites and digital solutions to solar power, electrical
              systems and security installations, we bring different
              technologies together to solve real-world problems.
            </p>

            <Link
              to="/about"
              className="mt-6 inline-flex items-center text-sm font-bold text-slate-950 transition hover:text-sky-500"
            >
              Learn more about us
              <span className="ml-2">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================
          SERVICES
          Stock images are used for now.
          Replace each image URL with your own project image later.
          ===================================================== */}
      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-sky-500">
                Our expertise
              </p>

              <h2 className="mt-3 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
                What we can build
                <span className="text-slate-400"> for you.</span>
              </h2>
            </div>

            <Link
              to="/services"
              className="text-sm font-bold text-slate-950 hover:text-sky-500"
            >
              View all services →
            </Link>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {services.map((service) => (
              <article
                key={service.number}
                className="group relative min-h-[420px] overflow-hidden rounded-3xl bg-slate-950"
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="absolute inset-0 h-full w-full object-cover opacity-60 transition duration-700 group-hover:scale-105 group-hover:opacity-70"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />

                <div className="relative flex h-full flex-col justify-between p-7 sm:p-9">
                  <div className="flex items-start justify-between">
                    <span className="text-sm font-bold text-sky-400">
                      {service.number}
                    </span>

                    <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur transition group-hover:bg-sky-500">
                      ↗
                    </div>
                  </div>

                  <div>
                    <h3 className="text-3xl font-black text-white">
                      {service.title}
                    </h3>

                    <p className="mt-3 max-w-md leading-7 text-slate-300">
                      {service.description}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          SOLAR FEATURE
          Replace image URL with your own solar installation
          photo later.
          ===================================================== */}
      <section className="overflow-hidden bg-slate-950">
        <div className="mx-auto grid max-w-7xl lg:grid-cols-2">
          <div className="flex items-center px-6 py-20 lg:px-12 lg:py-28">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-sky-400">
                Power your future
              </p>

              <h2 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">
                Reliable energy.
                <span className="block text-slate-500">
                  Built around you.
                </span>
              </h2>

              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
                We design and install solar power systems tailored to your
                energy needs, helping homes and businesses achieve more
                reliable power.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-2xl font-black text-white">01</p>
                  <p className="mt-2 text-sm text-slate-400">
                    System Design
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-2xl font-black text-white">02</p>
                  <p className="mt-2 text-sm text-slate-400">
                    Installation
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-2xl font-black text-white">03</p>
                  <p className="mt-2 text-sm text-slate-400">
                    Maintenance
                  </p>
                </div>
              </div>

              <Link
                to="/contact"
                className="mt-9 inline-flex rounded-xl bg-white px-7 py-4 text-sm font-bold text-slate-950 transition hover:bg-sky-400 hover:text-white"
              >
                Discuss Your Power Needs →
              </Link>
            </div>
          </div>

          <div className="relative min-h-[500px]">
            {/* Replace this stock image with your own solar installation photo */}
            <img
              src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1400&q=90"
              alt="Solar panels installation"
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-transparent to-transparent lg:bg-gradient-to-r" />
          </div>
        </div>
      </section>

      {/* =====================================================
          WHY CHOOSE US
          ===================================================== */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-sky-500">
              Why Harry Innovative Technologies
            </p>

            <h2 className="mt-4 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
              Technology should solve problems,
              <span className="text-slate-400"> not create them.</span>
            </h2>
          </div>

          <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-slate-200 bg-slate-200 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Quality",
                text: "We focus on solutions that are practical, reliable and built to last.",
              },
              {
                title: "Innovation",
                text: "We use modern technology to create smarter ways of solving problems.",
              },
              {
                title: "Professional",
                text: "Every project is approached with attention to detail and professionalism.",
              },
              {
                title: "Support",
                text: "Our relationship with clients does not end when the installation is complete.",
              },
            ].map((item, index) => (
              <div key={item.title} className="bg-white p-8">
                <span className="text-sm font-bold text-sky-500">
                  0{index + 1}
                </span>

                <h3 className="mt-8 text-xl font-black text-slate-950">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-500">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          FINAL CTA
          ===================================================== */}
      <section className="px-6 pb-8 lg:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-sky-500">
          <div className="relative px-7 py-16 sm:px-12 sm:py-20">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border-[40px] border-white/10" />
            <div className="absolute -bottom-32 right-20 h-80 w-80 rounded-full border-[50px] border-white/10" />

            <div className="relative max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-sky-950">
                Start a project
              </p>

              <h2 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-6xl">
                Have an idea?
                <span className="block text-sky-950">
                  Let's build it.
                </span>
              </h2>

              <p className="mt-6 max-w-xl text-lg leading-8 text-sky-950/80">
                Tell us what you need and let's find the right technology
                solution for you.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center rounded-xl bg-slate-950 px-7 py-4 text-sm font-bold text-white transition hover:bg-slate-800"
                >
                  Get in Touch →
                </Link>

                <a
                  href="https://wa.me/23490966218520"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-950/20 bg-white/20 px-7 py-4 text-sm font-bold text-slate-950 transition hover:bg-white/30"
                >
                  WhatsApp: 090966218520
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}