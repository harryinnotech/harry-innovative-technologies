import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import projects from "../data/projects";

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    "All",
    ...new Set(projects.map((project) => project.category)),
  ];

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") {
      return projects;
    }

    return projects.filter(
      (project) => project.category === activeCategory
    );
  }, [activeCategory]);

  const featuredProject = projects[0];

  return (
    <main className="bg-white text-slate-950">
      {/* HERO */}
      <section className="relative overflow-hidden bg-slate-950 pt-32 text-white">
        <div className="absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-blue-600/20 blur-[140px]" />
          <div className="absolute bottom-0 left-0 h-[350px] w-[350px] rounded-full bg-green-500/10 blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <p className="mb-5 text-sm font-bold uppercase tracking-[0.25em] text-green-400">
              Our Projects
            </p>

            <h1 className="text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl lg:text-8xl">
              Projects that
              <span className="block bg-gradient-to-r from-green-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                solve real problems.
              </span>
            </h1>

            <p className="mt-8 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              Explore our work across technology, energy, electrical
              engineering, security and other technical solutions.
            </p>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="border-b border-slate-200 bg-white py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_auto] lg:items-end lg:px-8">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
              Selected Work
            </p>

            <h2 className="text-3xl font-black tracking-tight sm:text-5xl">
              Built with purpose.
            </h2>

            <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
              Every project is approached from the same principle:
              understand the problem, design the right solution and build
              something that works.
            </p>
          </div>

          <div className="text-left lg:text-right">
            <p className="text-4xl font-black text-slate-950">
              {String(projects.length).padStart(2, "0")}
            </p>
            <p className="text-sm font-semibold text-slate-500">
              Featured Projects
            </p>
          </div>
        </div>
      </section>

      {/* FEATURED PROJECT */}
      <section className="bg-slate-50 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
                Featured Project
              </p>
              <h2 className="mt-2 text-2xl font-black sm:text-3xl">
                Start with our featured work
              </h2>
            </div>
          </div>

          <Link
            to={`/projects/${featuredProject.slug}`}
            className="group relative block overflow-hidden rounded-[2rem] bg-slate-950 shadow-2xl"
          >
            <div className="grid lg:grid-cols-2">
              <div className="relative min-h-[360px] overflow-hidden sm:min-h-[450px]">
                {/* Replace this stock image with your real project image. */}
                <img
                  src={featuredProject.image}
                  alt={featuredProject.title}
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent lg:bg-gradient-to-r" />

                <div className="absolute left-6 top-6 rounded-full border border-white/20 bg-black/30 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-md">
                  Featured
                </div>
              </div>

              <div className="flex flex-col justify-center p-8 text-white sm:p-12 lg:p-16">
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-green-400">
                  {featuredProject.category}
                </p>

                <h3 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
                  {featuredProject.title}
                </h3>

                <p className="mt-6 leading-8 text-slate-300">
                  {featuredProject.description}
                </p>

                <div className="mt-8 flex flex-wrap gap-3 text-sm text-slate-300">
                  <span>{featuredProject.year}</span>
                  <span>•</span>
                  <span>{featuredProject.location}</span>
                </div>

                <span className="mt-10 inline-flex items-center gap-3 font-bold text-white">
                  View case study
                  <span className="text-xl transition-transform duration-300 group-hover:translate-x-2">
                    →
                  </span>
                </span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* FILTER */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => {
              const active = activeCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-full px-5 py-3 text-sm font-bold transition ${
                    active
                      ? "bg-slate-950 text-white shadow-lg"
                      : "border border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:text-blue-600"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROJECT GRID */}
      <section className="pb-24 sm:pb-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {filteredProjects.length > 0 ? (
            <div className="grid gap-7 md:grid-cols-2">
              {filteredProjects.map((project, index) => (
                <Link
                  key={project.slug}
                  to={`/projects/${project.slug}`}
                  className={`group overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm transition duration-500 hover:-translate-y-1 hover:shadow-2xl ${
                    index === 0 && filteredProjects.length > 2
                      ? "md:col-span-2"
                      : ""
                  }`}
                >
                  <div
                    className={`relative overflow-hidden ${
                      index === 0 && filteredProjects.length > 2
                        ? "aspect-[2/1]"
                        : "aspect-[16/10]"
                    }`}
                  >
                    {/* Replace this stock image with your real project image. */}
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                    <div className="absolute left-5 top-5 rounded-full bg-white/90 px-4 py-2 text-xs font-bold text-slate-900 backdrop-blur">
                      {project.category}
                    </div>

                    <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4 text-white">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-300">
                          Project {project.number}
                        </p>

                        <h3 className="mt-1 text-2xl font-black sm:text-3xl">
                          {project.title}
                        </h3>
                      </div>

                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-xl text-slate-950 transition duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </div>
                  </div>

                  <div className="p-6 sm:p-7">
                    <p className="line-clamp-2 text-sm leading-7 text-slate-600 sm:text-base">
                      {project.description}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
                        {project.year}
                      </span>

                      <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
                        {project.location}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-12 text-center">
              <p className="font-bold text-slate-900">
                No projects found in this category.
              </p>

              <button
                type="button"
                onClick={() => setActiveCategory("All")}
                className="mt-4 font-semibold text-blue-600 hover:text-blue-700"
              >
                View all projects
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-950 py-20 text-white sm:py-28">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-green-400">
            Have a project in mind?
          </p>

          <h2 className="mt-5 text-4xl font-black tracking-tight sm:text-6xl">
            Let's build something
            <span className="block text-blue-400">that works.</span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl leading-8 text-slate-300">
            Tell us what you need and we'll help you find the right
            technical solution.
          </p>

          <Link
            to="/contact"
            className="mt-9 inline-flex rounded-xl bg-gradient-to-r from-green-500 to-blue-600 px-7 py-4 font-bold text-white shadow-xl transition hover:-translate-y-1"
          >
            Start a Project
          </Link>
        </div>
      </section>
    </main>
  );
}
