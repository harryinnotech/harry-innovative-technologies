import { Link } from "react-router-dom";

const services = [
  {
    number: "01",
    category: "DIGITAL",
    title: "Web Development",
    description:
      "High-performance websites and digital platforms designed to give your business a stronger presence online.",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=85",
  },
  {
    number: "02",
    category: "ENERGY",
    title: "Solar Installation",
    description:
      "Reliable solar and inverter systems engineered around the energy needs of homes, offices and businesses.",
    image:
      "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1600&q=85",
  },
  {
    number: "03",
    category: "ELECTRICAL",
    title: "Electrical Services",
    description:
      "Professional electrical installations, wiring, maintenance and troubleshooting built around safety and reliability.",
    image:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1600&q=85",
  },
  {
    number: "04",
    category: "SECURITY",
    title: "CCTV & Surveillance",
    description:
      "Modern surveillance systems that help you monitor your property and protect the things that matter.",
    image:
      "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=1600&q=85",
  },
  {
    number: "05",
    category: "ENGINEERING",
    title: "Electronics Repair",
    description:
      "Professional diagnosis and repair of electronic equipment with practical solutions that save you time and money.",
    image:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1600&q=85",
  },
  {
    number: "06",
    category: "DESIGN",
    title: "Building Plans",
    description:
      "Practical building plans and technical design support for residential and commercial projects.",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=85",
  },
  {
    number: "07",
    category: "AUTOMATION",
    title: "Smart Automation",
    description:
      "Technology-driven automation solutions that make spaces smarter, safer and more efficient.",
    image:
      "https://images.unsplash.com/photo-1558008258-3256797b43f3?auto=format&fit=crop&w=1600&q=85",
  },
];

const stats = [
  {
    value: "07+",
    label: "Service Areas",
  },
  {
    value: "24/7",
    label: "Support Mindset",
  },
  {
    value: "100%",
    label: "Commitment",
  },
  {
    value: "∞",
    label: "Possibilities",
  },
];

const process = [
  {
    number: "01",
    title: "Tell us what you need",
    text: "Share your idea, challenge or project with us. We listen first.",
  },
  {
    number: "02",
    title: "We design the solution",
    text: "We assess your requirements and develop a practical approach.",
  },
  {
    number: "03",
    title: "We build & deliver",
    text: "Our team turns the plan into a working solution with attention to detail.",
  },
  {
    number: "04",
    title: "We keep supporting you",
    text: "Our relationship does not end when the project is completed.",
  },
];

const reasons = [
  {
    number: "01",
    title: "Built around you",
    text: "Every project starts with understanding your actual needs, budget and goals.",
  },
  {
    number: "02",
    title: "Technology that works",
    text: "We focus on practical technology that solves problems instead of adding complexity.",
  },
  {
    number: "03",
    title: "Professional execution",
    text: "We approach every project with planning, communication and attention to detail.",
  },
  {
    number: "04",
    title: "One trusted team",
    text: "From digital technology to energy, security and electrical solutions, we bring multiple capabilities together.",
  },
];

const projects = [
  {
    category: "SOLAR",
    title: "Solar Power Systems",
    image:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1600&q=85",
  },
  {
    category: "DIGITAL",
    title: "Modern Digital Experiences",
    image:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1600&q=85",
  },
  {
    category: "SECURITY",
    title: "Smart Security Systems",
    image:
      "https://images.unsplash.com/photo-1558008258-3256797b43f3?auto=format&fit=crop&w=1600&q=85",
  },
];

const testimonials = [
  {
    quote:
      "Professional service, clear communication and a strong focus on getting the job done properly.",
    name: "Client Feedback",
    role: "Business Client",
  },
  {
    quote:
      "The team takes time to understand what you need and provides a practical solution.",
    name: "Client Feedback",
    role: "Residential Client",
  },
  {
    quote:
      "A reliable technology partner for projects that require both technical knowledge and creativity.",
    name: "Client Feedback",
    role: "Project Client",
  },
];

export default function Home() {
  return (
    <main className="overflow-hidden bg-white text-slate-950">

      {/* =========================================================
          HERO
          Replace the image URL below with your own company/project
          image when you have one.
      ========================================================== */}
      <section className="relative min-h-[92vh] overflow-hidden bg-slate-950">

        <div className="absolute inset-0">
          {/* STOCK IMAGE — Replace with your own hero/project photo */}
          <img
            src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=2200&q=90"
            alt="Technology and electronics"
            className="h-full w-full object-cover opacity-30"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/80 to-slate-950" />

          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/70 to-blue-950/40" />
        </div>

        {/* Decorative glow */}
        <div className="absolute -left-40 top-1/4 h-[500px] w-[500px] rounded-full bg-green-500/10 blur-[120px]" />
        <div className="absolute -right-40 bottom-0 h-[600px] w-[600px] rounded-full bg-blue-600/10 blur-[140px]" />

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        <div className="relative mx-auto flex min-h-[92vh] max-w-7xl items-center px-6 pb-20 pt-32 lg:px-8">

          <div className="max-w-6xl">

            {/* Eyebrow */}
            <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2.5 backdrop-blur-xl">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-60" />
                <span className="relative h-2.5 w-2.5 rounded-full bg-gradient-to-r from-green-400 to-blue-500" />
              </span>

              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-300 sm:text-xs">
                Technology • Energy • Security
              </span>
            </div>

            {/* Main heading */}
            <h1 className="max-w-6xl text-5xl font-black leading-[0.9] tracking-[-0.055em] text-white sm:text-7xl lg:text-[7rem]">
              Technology.
              <span className="block bg-gradient-to-r from-green-400 via-emerald-400 to-blue-500 bg-clip-text text-transparent">
                Built differently.
              </span>
            </h1>

            <p className="mt-8 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8 lg:text-xl">
              Harry Innovative Technologies builds practical solutions across
              digital technology, solar energy, electrical systems, security,
              electronics and automation.
            </p>

            {/* CTA */}
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4">

              <Link
                to="/contact"
                className="group inline-flex items-center justify-center rounded-xl bg-white px-7 py-4 text-sm font-bold text-slate-950 transition duration-300 hover:-translate-y-1 hover:bg-slate-100"
              >
                Start a Project

                <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>

              <Link
                to="/services"
                className="group inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-7 py-4 text-sm font-bold text-white backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-white/30 hover:bg-white/10"
              >
                Explore Solutions

                <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                  ↗
                </span>
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-14 grid max-w-3xl grid-cols-2 gap-y-7 border-t border-white/10 pt-7 sm:grid-cols-4 sm:gap-8">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-3xl font-black text-transparent sm:text-4xl">
                    {stat.value}
                  </p>

                  <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-slate-500 sm:text-[10px]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Bottom indicator */}
        <div className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 items-center gap-3 text-[10px] font-bold uppercase tracking-[0.25em] text-slate-600 md:flex">
          <span>Explore</span>
          <span className="h-px w-12 bg-gradient-to-r from-green-500 to-blue-500" />
        </div>
      </section>


      {/* =========================================================
          INTRO / BRAND STATEMENT
      ========================================================== */}
      <section className="relative overflow-hidden bg-white py-24 sm:py-32">

        <div className="absolute -right-40 top-10 h-96 w-96 rounded-full bg-blue-50 blur-3xl" />
        <div className="absolute -left-40 bottom-0 h-80 w-80 rounded-full bg-green-50 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.5fr]">

            <div>
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-gradient-to-r from-green-500 to-blue-600" />

                <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
                  Who we are
                </span>
              </div>

              <p className="mt-5 text-sm font-semibold text-slate-400">
                HARRY INNOVATIVE TECHNOLOGIES
              </p>
            </div>

            <div>
              <h2 className="text-4xl font-black leading-tight tracking-[-0.035em] text-slate-950 sm:text-5xl lg:text-6xl">
                We don't just provide services.
                <span className="block text-slate-400">
                  We engineer solutions.
                </span>
              </h2>

              <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-600">
                We are a technology and engineering company focused on
                creating useful solutions for modern homes, businesses and
                organizations. From the website representing your business
                online to the power, security and electrical systems keeping
                it running — we bring technology together in one place.
              </p>

              <Link
                to="/about"
                className="group mt-8 inline-flex items-center text-sm font-bold text-slate-950"
              >
                Discover our story

                <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>

          </div>
        </div>
      </section>


      {/* =========================================================
          SERVICES
      ========================================================== */}
      <section className="bg-slate-50 py-24 sm:py-32">

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end">

            <div>
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-gradient-to-r from-green-500 to-blue-600" />

                <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
                  Our capabilities
                </p>
              </div>

              <h2 className="mt-5 text-4xl font-black tracking-[-0.03em] text-slate-950 sm:text-6xl">
                One team.
                <span className="block text-slate-400">
                  Seven capabilities.
                </span>
              </h2>
            </div>

            <p className="max-w-sm text-sm leading-7 text-slate-500">
              Technology, engineering and practical solutions for the way
              people live and businesses operate today.
            </p>
          </div>


          {/* Services */}
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">

            {services.map((service, index) => (
              <article
                key={service.number}
                className={`group relative overflow-hidden rounded-[1.75rem] bg-slate-950 ${
                  index === 0 ? "lg:col-span-2" : ""
                }`}
              >

                <div
                  className={`relative ${
                    index === 0 ? "min-h-[500px]" : "min-h-[430px]"
                  }`}
                >

                  {/* STOCK IMAGE — Replace with your own project photo */}
                  <img
                    src={service.image}
                    alt={service.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover opacity-50 transition duration-700 group-hover:scale-105 group-hover:opacity-65"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/10" />

                  <div className="absolute inset-0 bg-gradient-to-r from-slate-950/30 to-transparent" />

                  <div className="relative flex h-full min-h-[430px] flex-col justify-between p-7 sm:p-9">

                    <div className="flex items-start justify-between">

                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-green-400">
                          {service.category}
                        </p>

                        <p className="mt-2 text-xs font-bold text-white/40">
                          {service.number}
                        </p>
                      </div>

                      <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-lg text-white backdrop-blur transition duration-300 group-hover:border-transparent group-hover:bg-gradient-to-r group-hover:from-green-500 group-hover:to-blue-600">
                        ↗
                      </div>

                    </div>

                    <div>
                      <h3 className="max-w-2xl text-3xl font-black tracking-tight text-white sm:text-4xl">
                        {service.title}
                      </h3>

                      <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300">
                        {service.description}
                      </p>

                      <Link
                        to="/services"
                        className="group/link mt-6 inline-flex items-center text-sm font-bold text-white"
                      >
                        Explore service

                        <span className="ml-2 transition-transform duration-300 group-hover/link:translate-x-1">
                          →
                        </span>
                      </Link>
                    </div>

                  </div>
                </div>
              </article>
            ))}

          </div>

        </div>
      </section>


      {/* =========================================================
          FEATURED SOLAR SECTION
          Replace image with your actual solar installation later.
      ========================================================== */}
      <section className="relative overflow-hidden bg-slate-950">

        <div className="absolute -left-40 top-1/3 h-[500px] w-[500px] rounded-full bg-green-500/10 blur-[120px]" />

        <div className="mx-auto grid max-w-7xl lg:grid-cols-2">

          <div className="relative flex items-center px-6 py-24 sm:px-10 lg:px-12 lg:py-32">

            <div className="relative">

              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-gradient-to-r from-green-400 to-blue-500" />

                <p className="text-xs font-bold uppercase tracking-[0.2em] text-green-400">
                  Energy systems
                </p>
              </div>

              <h2 className="mt-5 text-4xl font-black leading-tight tracking-[-0.03em] text-white sm:text-6xl">
                Your power.
                <span className="block text-slate-500">
                  Your control.
                </span>
              </h2>

              <p className="mt-7 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
                We design solar and inverter systems around how you actually
                use electricity. From system planning to installation, we
                build solutions designed for reliable everyday power.
              </p>

              <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3">

                {[
                  ["01", "Assessment"],
                  ["02", "System Design"],
                  ["03", "Installation"],
                ].map(([number, title]) => (
                  <div
                    key={number}
                    className="border border-white/10 bg-white/[0.035] p-5 transition duration-300 hover:border-green-500/30 hover:bg-white/[0.06]"
                  >
                    <p className="text-2xl font-black text-white">
                      {number}
                    </p>

                    <p className="mt-2 text-xs leading-5 text-slate-400">
                      {title}
                    </p>
                  </div>
                ))}

              </div>

              <Link
                to="/contact"
                className="mt-9 inline-flex rounded-xl bg-gradient-to-r from-green-500 to-blue-600 px-7 py-4 text-sm font-bold text-white shadow-xl shadow-blue-900/20 transition duration-300 hover:-translate-y-1 hover:shadow-blue-500/20"
              >
                Plan Your Solar System →
              </Link>

            </div>
          </div>


          <div className="relative min-h-[500px] lg:min-h-[680px]">

            {/* STOCK IMAGE — Replace with your own solar project photo */}
            <img
              src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1600&q=90"
              alt="Solar panels"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent lg:bg-gradient-to-r" />

            <div className="absolute bottom-8 left-8 border border-white/10 bg-slate-950/70 px-5 py-4 backdrop-blur-xl">

              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-green-400">
                Solar Solutions
              </p>

              <p className="mt-1 text-sm font-semibold text-white">
                Designed around your energy needs.
              </p>

            </div>

          </div>

        </div>
      </section>


      {/* =========================================================
          HOW WE WORK
      ========================================================== */}
      <section className="bg-white py-24 sm:py-32">

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="max-w-3xl">

            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-gradient-to-r from-green-500 to-blue-600" />

              <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
                How we work
              </p>
            </div>

            <h2 className="mt-5 text-4xl font-black tracking-[-0.03em] text-slate-950 sm:text-6xl">
              From idea
              <span className="text-slate-400"> to reality.</span>
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-500">
              A simple process designed to keep your project clear from the
              first conversation to the final result.
            </p>

          </div>


          <div className="mt-16 grid border-y border-slate-200 md:grid-cols-2 lg:grid-cols-4">

            {process.map((item, index) => (
              <div
                key={item.number}
                className="group relative border-b border-slate-200 p-7 md:odd:border-r lg:border-b-0 lg:border-r lg:last:border-r-0"
              >

                <div className="flex items-center justify-between">

                  <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-sm font-black text-transparent">
                    {item.number}
                  </span>

                  {index < process.length - 1 && (
                    <span className="hidden text-slate-300 lg:block">
                      →
                    </span>
                  )}

                </div>

                <div className="mt-8 h-1 w-8 bg-gradient-to-r from-green-500 to-blue-600 transition-all duration-300 group-hover:w-16" />

                <h3 className="mt-6 text-xl font-black text-slate-950">
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


      {/* =========================================================
          PROJECTS
          Replace images with actual completed projects later.
      ========================================================== */}
      <section className="bg-slate-50 py-24 sm:py-32">

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end">

            <div>

              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-gradient-to-r from-green-500 to-blue-600" />

                <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
                  Selected work
                </p>
              </div>

              <h2 className="mt-5 text-4xl font-black tracking-[-0.03em] text-slate-950 sm:text-6xl">
                Ideas become
                <span className="block text-slate-400">
                  real projects.
                </span>
              </h2>

            </div>

            <Link
              to="/projects"
              className="group text-sm font-bold text-slate-950"
            >
              View all projects

              <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>

          </div>


          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">

            {projects.map((project, index) => (
              <Link
                to="/projects"
                key={project.title}
                className={`group relative overflow-hidden rounded-[1.75rem] bg-slate-950 ${
                  index === 0 ? "md:col-span-2 lg:col-span-2" : ""
                }`}
              >

                <div className="relative min-h-[400px]">

                  {/* STOCK IMAGE — Replace with your actual project image */}
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover opacity-70 transition duration-700 group-hover:scale-105 group-hover:opacity-90"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-7">

                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-green-400">
                      {project.category}
                    </p>

                    <div className="mt-2 flex items-end justify-between gap-4">

                      <h3 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
                        {project.title}
                      </h3>

                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur transition duration-300 group-hover:bg-white group-hover:text-slate-950">
                        ↗
                      </span>

                    </div>

                  </div>

                </div>
              </Link>
            ))}

          </div>

        </div>
      </section>


      {/* =========================================================
          WHY CHOOSE US
      ========================================================== */}
      <section className="bg-white py-24 sm:py-32">

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="grid gap-14 lg:grid-cols-[0.9fr_1.4fr]">

            <div>

              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-gradient-to-r from-green-500 to-blue-600" />

                <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
                  Why choose us
                </p>
              </div>

              <h2 className="mt-5 text-4xl font-black leading-tight tracking-[-0.03em] text-slate-950 sm:text-5xl">
                Better technology.
                <span className="block text-slate-400">
                  Better thinking.
                </span>
              </h2>

              <p className="mt-6 max-w-md leading-7 text-slate-500">
                We believe good technology should be useful, reliable and
                understandable.
              </p>

            </div>


            <div className="grid border-t border-slate-200 sm:grid-cols-2">

              {reasons.map((reason) => (
                <div
                  key={reason.number}
                  className="border-b border-slate-200 p-7 sm:odd:border-r"
                >

                  <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-xs font-black text-transparent">
                    {reason.number}
                  </span>

                  <h3 className="mt-5 text-xl font-black text-slate-950">
                    {reason.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-500">
                    {reason.text}
                  </p>

                </div>
              ))}

            </div>

          </div>

        </div>
      </section>


      {/* =========================================================
          TESTIMONIALS
      ========================================================== */}
      <section className="bg-slate-950 py-24 sm:py-32">

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="flex items-center gap-3">

            <span className="h-px w-10 bg-gradient-to-r from-green-400 to-blue-500" />

            <p className="text-xs font-bold uppercase tracking-[0.2em] text-green-400">
              Client experience
            </p>

          </div>

          <div className="mt-5 flex flex-col justify-between gap-7 lg:flex-row lg:items-end">

            <h2 className="max-w-3xl text-4xl font-black tracking-[-0.03em] text-white sm:text-6xl">
              Good work speaks
              <span className="text-slate-500"> for itself.</span>
            </h2>

            <p className="max-w-sm text-sm leading-7 text-slate-500">
              Replace these placeholder testimonials with feedback from your
              real customers as your project portfolio grows.
            </p>

          </div>


          <div className="mt-14 grid gap-5 lg:grid-cols-3">

            {testimonials.map((testimonial) => (
              <div
                key={testimonial.role}
                className="border border-white/10 bg-white/[0.035] p-7 transition duration-300 hover:border-green-500/30 hover:bg-white/[0.06]"
              >

                <div className="flex gap-1 text-green-400">
                  ★ ★ ★ ★ ★
                </div>

                <p className="mt-7 text-base leading-8 text-slate-300">
                  “{testimonial.quote}”
                </p>

                <div className="mt-8 border-t border-white/10 pt-5">

                  <p className="text-sm font-bold text-white">
                    {testimonial.name}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {testimonial.role}
                  </p>

                </div>

              </div>
            ))}

          </div>

        </div>
      </section>


      {/* =========================================================
          LOCATION / SERVICE AREA
      ========================================================== */}
      <section className="relative overflow-hidden bg-white py-20 sm:py-24">

        <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-green-50 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

          <div className="grid items-center gap-10 rounded-[2rem] border border-slate-200 bg-slate-50 p-8 sm:p-12 lg:grid-cols-[1fr_auto] lg:p-16">

            <div>

              <div className="flex items-center gap-3">

                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-green-500 to-blue-600 text-sm text-white">
                  ●
                </span>

                <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
                  Based in Nigeria
                </p>

              </div>

              <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                Local expertise.
                <span className="text-slate-400">
                  {" "}
                  Bigger possibilities.
                </span>
              </h2>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
                We work with individuals, homes, businesses and organizations
                to provide practical technology and engineering solutions.
              </p>

            </div>

            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-xl bg-slate-950 px-7 py-4 text-sm font-bold text-white transition duration-300 hover:-translate-y-1 hover:bg-blue-600"
            >
              Work With Us →
            </Link>

          </div>

        </div>
      </section>


      {/* =========================================================
          FINAL CTA
      ========================================================== */}
      <section className="px-4 pb-6 sm:px-6 lg:px-8">

        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-slate-950">

          {/* Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-600 via-emerald-600 to-blue-700" />

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-slate-950/10" />

          {/* Decorative circles */}
          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full border-[55px] border-white/10" />

          <div className="absolute -bottom-48 right-20 h-[500px] w-[500px] rounded-full border-[65px] border-white/10" />

          <div className="absolute -left-40 bottom-0 h-80 w-80 rounded-full bg-blue-900/20 blur-3xl" />

          <div className="relative px-7 py-20 sm:px-12 sm:py-24 lg:px-16 lg:py-28">

            <div className="max-w-4xl">

              <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/70">
                Start something new
              </p>

              <h2 className="mt-5 text-5xl font-black leading-[0.95] tracking-[-0.04em] text-white sm:text-7xl">
                Got a problem?
                <span className="block text-slate-950">
                  Let's solve it.
                </span>
              </h2>

              <p className="mt-7 max-w-2xl text-base leading-8 text-white/80 sm:text-lg">
                Whether you need a website, solar system, electrical work,
                CCTV, electronics repair, building plan or automation —
                let's talk about what you want to build.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4">

                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center rounded-xl bg-slate-950 px-7 py-4 text-sm font-bold text-white transition duration-300 hover:-translate-y-1 hover:bg-slate-900"
                >
                  Get a Quote →
                </Link>

                <a
                  href="https://wa.me/2349066218520"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-xl border border-white/30 bg-white/10 px-7 py-4 text-sm font-bold text-white backdrop-blur transition duration-300 hover:-translate-y-1 hover:bg-white/20"
                >
                  WhatsApp Us
                </a>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* Bottom spacing */}
      <div className="h-2 bg-white" />

    </main>
  );
}