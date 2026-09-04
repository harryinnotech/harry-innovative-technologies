const services = [
  {
    number: "01",
    title: "Solar Energy",
    description:
      "Solar system design, installation, maintenance and troubleshooting for homes, offices and businesses.",
    image:
      "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1400&q=85",
  },
  {
    number: "02",
    title: "Electrical Services",
    description:
      "Professional electrical wiring, installations, maintenance and repairs for residential and commercial properties.",
    image:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1400&q=85",
  },
  {
    number: "03",
    title: "Web Design & Development",
    description:
      "Modern responsive websites, landing pages and digital platforms that help businesses establish their online presence.",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=85",
  },
  {
    number: "04",
    title: "CCTV & Security",
    description:
      "Security camera installation and surveillance solutions for homes, offices, shops and commercial properties.",
    image:
      "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=1400&q=85",
  },
  {
    number: "05",
    title: "Electronics Repair",
    description:
      "Diagnosis, repair, modification and maintenance of electronic devices and systems.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=85",
  },
  {
    number: "06",
    title: "Automation",
    description:
      "Smart automation solutions designed to improve convenience, security, productivity and energy efficiency.",
    image:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1400&q=85",
  },
  {
    number: "07",
    title: "Building Plans",
    description:
      "Technical building plan and design support for construction and development projects.",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1400&q=85",
  },
];

export default function Services() {
  return (
    <main className="pt-20">

      <section className="bg-slate-950 py-28 text-white">

        <div className="mx-auto max-w-7xl px-5 lg:px-8">

          <p className="text-sm font-bold uppercase tracking-[0.25em] text-slate-500">
            What We Do
          </p>

          <h1 className="mt-5 max-w-4xl text-5xl font-extrabold md:text-7xl">
            Technology and engineering
            <span className="block text-slate-500">
              without the complexity.
            </span>
          </h1>

        </div>

      </section>

      <section className="bg-slate-50 py-24">

        <div className="mx-auto max-w-7xl px-5 lg:px-8">

          <div className="grid gap-7 md:grid-cols-2">

            {services.map((service) => (
              <article
                key={service.number}
                className="group overflow-hidden rounded-3xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-2xl"
              >

                <div className="relative h-72 overflow-hidden">

                  {/* Replace this stock URL with your own service image */}
                  <img
                    src={service.image}
                    alt={service.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-slate-950/25"></div>

                  <div className="absolute left-6 top-6 flex h-12 w-12 items-center justify-center rounded-xl bg-white font-bold text-slate-950">
                    {service.number}
                  </div>

                </div>

                <div className="p-8">

                  <h2 className="text-2xl font-extrabold text-slate-950">
                    {service.title}
                  </h2>

                  <p className="mt-4 leading-7 text-slate-600">
                    {service.description}
                  </p>

                  <a
                    href="/contact"
                    className="mt-6 inline-block font-bold text-slate-950"
                  >
                    Request this service →
                  </a>

                </div>

              </article>
            ))}

          </div>

        </div>

      </section>

    </main>
  );
}