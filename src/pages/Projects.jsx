const projects = [
  {
    title: "Solar Power Installation",
    category: "Solar Energy",
    image:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1400&q=85",
  },
  {
    title: "Electrical Engineering",
    category: "Electrical",
    image:
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1400&q=85",
  },
  {
    title: "Security & Surveillance",
    category: "CCTV",
    image:
      "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=1400&q=85",
  },
  {
    title: "Digital Solutions",
    category: "Web Development",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=85",
  },
  {
    title: "Electronics",
    category: "Repair & Engineering",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=85",
  },
  {
    title: "Engineering Solutions",
    category: "Technology",
    image:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1400&q=85",
  },
];

export default function Projects() {
  return (
    <main className="pt-20">

      <section className="bg-slate-950 py-28 text-white">

        <div className="mx-auto max-w-7xl px-5 lg:px-8">

          <p className="text-sm font-bold uppercase tracking-[0.25em] text-slate-500">
            Our Work
          </p>

          <h1 className="mt-5 text-5xl font-extrabold md:text-7xl">
            Projects & solutions.
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-400">
            A preview of the kind of technology and engineering
            solutions we deliver.
          </p>

        </div>

      </section>

      <section className="bg-white py-24">

        <div className="mx-auto max-w-7xl px-5 lg:px-8">

          <div className="grid gap-7 md:grid-cols-2">

            {projects.map((project, index) => (
              <article
                key={project.title}
                className="group relative overflow-hidden rounded-3xl"
              >

                {/* ==================================================
                    REPLACE THIS IMAGE WITH YOUR ACTUAL PROJECT PHOTO
                =================================================== */}
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-[420px] w-full object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>

                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">

                  <div className="flex items-center justify-between">

                    <div>

                      <p className="text-sm font-bold uppercase tracking-widest text-slate-300">
                        {project.category}
                      </p>

                      <h2 className="mt-2 text-2xl font-extrabold">
                        {project.title}
                      </h2>

                    </div>

                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-xl text-slate-950">
                      ↗
                    </span>

                  </div>

                </div>

              </article>
            ))}

          </div>

          <div className="mt-16 rounded-3xl bg-slate-950 p-10 text-center text-white md:p-16">

            <h2 className="text-3xl font-extrabold md:text-4xl">
              Want your project here?
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-slate-400">
              Contact us and let's discuss how we can turn your idea
              into a finished project.
            </p>

            <a
              href="/contact"
              className="mt-7 inline-block rounded-xl bg-white px-7 py-4 font-bold text-slate-950"
            >
              Start a Project
            </a>

          </div>

        </div>

      </section>

    </main>
  );
}