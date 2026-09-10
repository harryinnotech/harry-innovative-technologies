import { Link } from "react-router-dom";

const services = [
  {
    number: "01",
    title: "Solar Energy",
    shortTitle: "Solar Systems",
    description:
      "Reliable solar power systems designed around your energy needs, from homes and offices to commercial properties.",
    details: [
      "Solar system design",
      "Panel & inverter installation",
      "Battery backup systems",
      "System maintenance",
      "Fault diagnosis & troubleshooting",
    ],
    image:
      "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1600&q=85",
  },
  {
    number: "02",
    title: "Electrical Services",
    shortTitle: "Electrical",
    description:
      "Professional electrical installation and maintenance focused on safety, reliability and clean workmanship.",
    details: [
      "Residential wiring",
      "Commercial electrical installations",
      "Electrical maintenance",
      "Fault finding & repairs",
      "Lighting & power systems",
    ],
    image:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1600&q=85",
  },
  {
    number: "03",
    title: "Web Design & Development",
    shortTitle: "Web Development",
    description:
      "Modern, responsive websites and digital experiences built to make your business look professional and reach more customers.",
    details: [
      "Business websites",
      "Landing pages",
      "Responsive web design",
      "E-commerce solutions",
      "Website maintenance",
    ],
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=85",
  },
  {
    number: "04",
    title: "CCTV & Security",
    shortTitle: "Security",
    description:
      "Smart surveillance solutions that help you monitor and protect your home, office, shop or business.",
    details: [
      "CCTV camera installation",
      "IP camera systems",
      "Remote monitoring",
      "Security system maintenance",
      "Surveillance planning",
    ],
    image:
      "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=1600&q=85",
  },
  {
    number: "05",
    title: "Electronics Repair",
    shortTitle: "Electronics",
    description:
      "Professional diagnosis, repair and modification of electronic devices and systems with a focus on practical solutions.",
    details: [
      "Fault diagnosis",
      "Electronic repairs",
      "Circuit troubleshooting",
      "Device modification",
      "Preventive maintenance",
    ],
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=85",
  },
  {
    number: "06",
    title: "Automation",
    shortTitle: "Automation",
    description:
      "Intelligent automation solutions that improve convenience, security, productivity and energy efficiency.",
    details: [
      "Smart home solutions",
      "Automated lighting",
      "Security automation",
      "Energy management",
      "Custom automation systems",
    ],
    image:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=85",
  },
  {
    number: "07",
    title: "Building Plans",
    shortTitle: "Building Design",
    description:
      "Technical building plan and design support for construction, renovation and development projects.",
    details: [
      "Building plan development",
      "Floor plans",
      "Technical drawings",
      "Space planning",
      "Construction design support",
    ],
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=85",
  },
];

const principles = [
  {
    number: "01",
    title: "Understand",
    description:
      "We first understand your needs, your environment and the problem you want to solve.",
  },
  {
    number: "02",
    title: "Design",
    description:
      "We develop a practical solution around your requirements, budget and long-term goals.",
  },
  {
    number: "03",
    title: "Build",
    description:
      "Our focus is clean implementation, reliable components and quality workmanship.",
  },
  {
    number: "04",
    title: "Support",
    description:
      "We remain available to help maintain, improve and troubleshoot your solution.",
  },
];

export default function Services() {
  return (
    <main>
      {/* =========================================================
          HERO SECTION
          ========================================================= */}
      <section className="relative overflow-hidden bg-slate-950 text-white">
        {/* Decorative background */}
        <div className="absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-blue-600/10 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-[400px] w-[500px] rounded-full bg-green-500/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 py-28 sm:py-32 lg:px-8 lg:py-40">
          <div className="max-w-5xl">
            <div className="mb-8 flex items-center gap-3">
              <span className="h-px w-10 bg-gradient-to-r from-green-500 to-blue-500" />

              <p className="text-sm font-bold uppercase tracking-[0.28em] text-slate-400">
                Our Services
              </p>
            </div>

            <h1 className="text-5xl font-extrabold leading-[0.95] tracking-tight sm:text-6xl lg:text-8xl">
              Solutions built
              <span className="block text-slate-500">
                around your needs.
              </span>
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-400 sm:text-xl">
              From digital experiences and solar systems to electrical
              installations, security and automation — we combine technology
              and practical engineering to solve real problems.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                to="/contact"
                className="group inline-flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-green-600 to-blue-600 px-7 py-4 font-bold text-white shadow-xl shadow-blue-500/10 transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                Start a Project
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>

              <a
                href="#services"
                className="inline-flex items-center justify-center rounded-xl border border-white/15 px-7 py-4 font-bold text-white transition hover:border-white/30 hover:bg-white/5"
              >
                Explore Services
              </a>
            </div>
          </div>

          {/* Bottom stats */}
          <div className="mt-20 grid max-w-4xl grid-cols-2 gap-8 border-t border-white/10 pt-8 sm:grid-cols-4">
            <div>
              <p className="text-3xl font-extrabold">07</p>
              <p className="mt-1 text-sm text-slate-500">Core services</p>
            </div>

            <div>
              <p className="text-3xl font-extrabold">01</p>
              <p className="mt-1 text-sm text-slate-500">Technology partner</p>
            </div>

            <div>
              <p className="text-3xl font-extrabold">∞</p>
              <p className="mt-1 text-sm text-slate-500">Possibilities</p>
            </div>

            <div>
              <p className="text-3xl font-extrabold">100%</p>
              <p className="mt-1 text-sm text-slate-500">Commitment</p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          INTRODUCTION
          ========================================================= */}
      <section className="bg-white py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-blue-600">
                One company. Multiple capabilities.
              </p>
            </div>

            <div>
              <h2 className="text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
                We don't just provide services.
                <span className="block text-slate-400">
                  We engineer solutions.
                </span>
              </h2>

              <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-600">
                Every project is different. That's why we focus on
                understanding the problem first, then designing a solution
                that is practical, reliable and built to last.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          SERVICES
          ========================================================= */}
      <section id="services" className="bg-slate-50 py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-blue-600">
                What we do
              </p>

              <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
                Our capabilities.
              </h2>
            </div>

            <p className="max-w-md text-slate-600">
              Technology, energy, security and engineering services brought
              together under one roof.
            </p>
          </div>

          <div className="grid gap-7 md:grid-cols-2">
            {services.map((service, index) => (
              <article
                key={service.number}
                className={`group overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200/70 transition duration-500 hover:-translate-y-1 hover:shadow-2xl ${
                  index === 0 ? "md:col-span-2" : ""
                }`}
              >
                <div
                  className={`grid ${
                    index === 0
                      ? "lg:grid-cols-[1.05fr_0.95fr]"
                      : "lg:grid-cols-[0.95fr_1.05fr]"
                  }`}
                >
                  {/* Image */}
                  <div
                    className={`relative overflow-hidden ${
                      index === 0 ? "h-80 lg:h-full" : "h-72"
                    }`}
                  >
                    {/* =================================================
                        REPLACE STOCK IMAGE HERE
                        Replace service.image with your own image later.
                        ================================================= */}
                    <img
                      src={service.image}
                      alt={service.title}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/10 to-transparent" />

                    <div className="absolute left-6 top-6 flex h-12 w-12 items-center justify-center rounded-xl bg-white text-sm font-extrabold text-slate-950 shadow-lg">
                      {service.number}
                    </div>

                    <p className="absolute bottom-6 left-6 text-xs font-bold uppercase tracking-[0.2em] text-white/70">
                      {service.shortTitle}
                    </p>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col justify-center p-7 sm:p-9 lg:p-10">
                    <h3 className="text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">
                      {service.title}
                    </h3>

                    <p className="mt-4 leading-7 text-slate-600">
                      {service.description}
                    </p>

                    <div className="mt-7 border-t border-slate-100 pt-6">
                      <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                        What we offer
                      </p>

                      <ul className="grid gap-3 sm:grid-cols-2">
                        {service.details.map((detail) => (
                          <li
                            key={detail}
                            className="flex items-start gap-2 text-sm font-medium text-slate-700"
                          >
                            <span className="mt-1 text-blue-600">+</span>
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Link
                      to="/contact"
                      className="group/link mt-8 inline-flex w-fit items-center gap-2 font-bold text-slate-950"
                    >
                      Request this service
                      <span className="transition-transform duration-300 group-hover/link:translate-x-1">
                        →
                      </span>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          HOW WE WORK
          ========================================================= */}
      <section className="bg-slate-950 py-24 text-white sm:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-blue-400">
              Our approach
            </p>

            <h2 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
              Simple process.
              <span className="block text-slate-500">
                Serious results.
              </span>
            </h2>
          </div>

          <div className="mt-16 grid gap-px overflow-hidden rounded-3xl bg-white/10 border border-white/10 md:grid-cols-4">
            {principles.map((item) => (
              <div
                key={item.number}
                className="bg-slate-950 p-7 transition hover:bg-slate-900 sm:p-8"
              >
                <p className="text-sm font-bold text-slate-500">
                  {item.number}
                </p>

                <h3 className="mt-12 text-2xl font-extrabold">
                  {item.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-slate-400">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          FEATURE SECTION
          ========================================================= */}
      <section className="overflow-hidden bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-green-600">
                Built for real life
              </p>

              <h2 className="mt-5 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
                The right solution is more than just technology.
              </h2>

              <p className="mt-6 text-lg leading-8 text-slate-600">
                Whether we're installing solar panels, building your website,
                securing your property or repairing electronics, our goal is
                the same: deliver something that works reliably in the real
                world.
              </p>

              <div className="mt-8 space-y-5">
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-50 font-bold text-green-600">
                    01
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-950">
                      Practical thinking
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      We focus on solutions that make sense for your actual
                      needs and environment.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 font-bold text-blue-600">
                    02
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-950">
                      Quality execution
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      We care about clean installation, thoughtful design and
                      dependable results.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 font-bold text-slate-700">
                    03
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-950">
                      Long-term value
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      We build with maintenance, scalability and future needs
                      in mind.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              {/* =================================================
                  REPLACE THIS STOCK IMAGE WITH YOUR OWN PHOTO
                  Recommended: a real photo of your team working.
                  ================================================= */}
              <img
                src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1600&q=85"
                alt="Engineering and technology work"
                loading="lazy"
                decoding="async"
                className="h-[500px] w-full rounded-3xl object-cover shadow-2xl"
              />

              <div className="absolute -bottom-6 -left-4 rounded-2xl bg-slate-950 p-6 text-white shadow-2xl sm:-left-8">
                <p className="text-3xl font-extrabold">07+</p>
                <p className="mt-1 text-sm text-slate-400">
                  Areas of expertise
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          FINAL CTA
          ========================================================= */}
      <section className="relative overflow-hidden bg-slate-950 py-24 text-white sm:py-32">
        <div className="absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-5xl px-5 text-center lg:px-8">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-slate-500">
            Ready when you are
          </p>

          <h2 className="mt-5 text-4xl font-extrabold tracking-tight sm:text-6xl">
            Have a problem?
            <span className="block text-slate-500">
              Let's build the solution.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
            Tell us what you need and let's work out the right solution for
            your home, business or project.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              to="/contact"
              className="rounded-xl bg-white px-7 py-4 font-bold text-slate-950 transition hover:-translate-y-1 hover:bg-slate-100"
            >
              Get a Quote
            </Link>

            <a
              href="https://wa.me/2349066218520"
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-white/15 px-7 py-4 font-bold text-white transition hover:-translate-y-1 hover:border-white/30 hover:bg-white/5"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}