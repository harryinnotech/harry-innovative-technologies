// src/pages/ProjectDetails.jsx

import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import projects from "../data/projects";

export default function ProjectDetails() {
  const { slug } = useParams();

  const project = useMemo(
    () => projects.find((item) => item.slug === slug),
    [slug]
  );

  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [slug]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedImage(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = selectedImage ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedImage]);

  if (!project) {
    return (
      <main className="min-h-screen bg-white px-4 pb-24 pt-40 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
            Project not found
          </p>

          <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
            We couldn't find that project.
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-slate-600">
            The project may have been moved, renamed, or the link may be
            incorrect.
          </p>

          <Link
            to="/projects"
            className="mt-8 inline-flex rounded-xl bg-slate-950 px-6 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-blue-600"
          >
            Back to Projects
          </Link>
        </div>
      </main>
    );
  }

  const gallery = (project.gallery || [])
    .map((item) => (typeof item === "string" ? { image: item } : item))
    .filter((item) => item?.image);
  const technologies = project.technologies || [];
  const specifications = project.specifications || [];
  const results = project.results || [];
  const timeline = project.timeline || [];
  const tags = project.tags || [];

  const relatedProjects = projects.filter(
    (item) =>
      item.slug !== project.slug &&
      (project.relatedProjects || []).includes(item.slug)
  );

  const currentIndex = projects.findIndex(
    (item) => item.slug === project.slug
  );

  const previousProject =
    currentIndex > 0 ? projects[currentIndex - 1] : null;

  const nextProject =
    currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  const whatsappMessage = encodeURIComponent(
    `Hello Harry Innovative Technologies, I'm interested in a project similar to "${project.title}". I would like to discuss the details.`
  );

  const shareUrl =
    typeof window !== "undefined" ? window.location.href : "";

  const shareOnWhatsApp = () => {
    window.open(
      `https://wa.me/2349066218520?text=${encodeURIComponent(
        `Check out this project by Harry Innovative Technologies:\n\n${project.title}\n${shareUrl}`
      )}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const shareOnFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        shareUrl
      )}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      alert("Project link copied.");
    } catch {
      alert("Unable to copy the link.");
    }
  };

  return (
    <>
      <main className="bg-white text-slate-950">
        {/* ======================================================
            HERO
        ======================================================= */}
        <section className="relative overflow-hidden bg-slate-950 pt-32 text-white sm:pt-36">
          <div className="absolute inset-0">
            <img
              src={project.heroImage || project.image || gallery[0]?.image}
              alt={project.title}
              className="h-full w-full object-cover opacity-35"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/40" />
          </div>

          <div className="relative mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
            <div className="max-w-4xl">
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 text-sm font-bold text-slate-300 transition hover:text-white"
              >
                ← Back to Projects
              </Link>

              <div className="mt-10 flex flex-wrap gap-3">
                {project.category && (
                  <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] text-white backdrop-blur">
                    {project.category}
                  </span>
                )}

                {project.year && (
                  <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold text-slate-200 backdrop-blur">
                    {project.year}
                  </span>
                )}

                {project.status && (
                  <span className="rounded-full border border-green-400/20 bg-green-400/10 px-4 py-2 text-xs font-bold text-green-300 backdrop-blur">
                    {project.status}
                  </span>
                )}
              </div>

              <h1 className="mt-7 max-w-4xl text-4xl font-black tracking-tight sm:text-6xl lg:text-7xl">
                {project.title}
              </h1>

              {project.summary && (
                <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl">
                  {project.summary}
                </p>
              )}

              <div className="mt-9 flex flex-wrap gap-3">
                <a
                  href={`https://wa.me/2349066218520?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl bg-green-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-green-600/20 transition hover:-translate-y-0.5 hover:bg-green-500"
                >
                  Discuss a Similar Project
                </a>

                <button
                  type="button"
                  onClick={shareOnWhatsApp}
                  className="rounded-xl border border-white/15 bg-white/10 px-6 py-3.5 text-sm font-bold text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/15"
                >
                  Share Project
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================
            PROJECT META
        ======================================================= */}
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-slate-200 sm:grid-cols-4">
            {[
              ["Client", project.client || "Private Client"],
              ["Location", project.location || "Nigeria"],
              ["Duration", project.duration || "—"],
              ["Status", project.status || "Completed"],
            ].map(([label, value]) => (
              <div key={label} className="px-5 py-7 sm:px-8">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                  {label}
                </p>

                <p className="mt-2 text-sm font-bold text-slate-900 sm:text-base">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ======================================================
            GALLERY
        ======================================================= */}
        {gallery.length > 0 && (
          <section className="py-16 sm:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="relative overflow-hidden rounded-3xl bg-slate-100">
                <button
                  type="button"
                  onClick={() => setSelectedImage(gallery[0].image)}
                  className="group block w-full cursor-zoom-in"
                >
                  <img
                    src={gallery[0].image}
                    alt={`${project.title} featured`}
                    className="aspect-[16/8] w-full object-cover transition duration-700 group-hover:scale-[1.02]"
                  />
                </button>
              </div>

              {gallery.length > 1 && (
                <div className="mt-5">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-sm font-bold text-slate-900">
                      Project Gallery
                    </p>

                    <span className="hidden text-xs font-semibold text-slate-400 sm:block">
                      Scroll →
                    </span>
                  </div>

                  <div className="flex gap-4 overflow-x-auto pb-3">
                    {gallery.slice(1).map((image, index) => (
                      <button
                        key={`${image}-${index}`}
                        type="button"
                        onClick={() => setSelectedImage(image.image)}
                        className="group w-[190px] shrink-0 cursor-zoom-in overflow-hidden rounded-2xl bg-slate-100 sm:w-[230px] lg:w-[260px]"
                      >
                        <img
                          src={image.image}
                          alt={`${project.title} gallery ${index + 2}`}
                          loading="lazy"
                          className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}
{/* ======================================================
    PROJECT VIDEO
======================================================= */}
{project.video?.url && (
  <section className="pb-20 sm:pb-24">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
          Project Video
        </p>

        <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
          See the work in action.
        </h2>

        {project.video.title && (
          <p className="mt-3 text-slate-600">
            {project.video.title}
          </p>
        )}
      </div>

      <div className="overflow-hidden rounded-3xl bg-slate-950 shadow-2xl">
        <div className="aspect-video w-full">
          <iframe
            src={`https://www.youtube.com/embed/${
              project.video.url.split("v=")[1]?.split("&")[0]
            }`}
            title={project.video.title || project.title}
            className="h-full w-full"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  </section>
)}
        {/* ======================================================
            OVERVIEW
        ======================================================= */}
        <section className="border-t border-slate-200 py-20 sm:py-24">
          <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-[1.4fr_0.6fr] lg:px-8">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
                Project Overview
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
                Engineering the right solution.
              </h2>

              {project.description && (
                <p className="mt-6 text-base leading-8 text-slate-600">
                  {project.description}
                </p>
              )}

              {project.challenge && (
                <div className="mt-10">
                  <h3 className="text-xl font-black">The Challenge</h3>

                  <p className="mt-3 leading-8 text-slate-600">
                    {project.challenge}
                  </p>
                </div>
              )}

              {project.approach && (
                <div className="mt-8">
                  <h3 className="text-xl font-black">Our Approach</h3>

                  <p className="mt-3 leading-8 text-slate-600">
                    {project.approach}
                  </p>
                </div>
              )}

              {project.solution && (
                <div className="mt-8">
                  <h3 className="text-xl font-black">The Solution</h3>

                  <p className="mt-3 leading-8 text-slate-600">
                    {project.solution}
                  </p>
                </div>
              )}
            </div>

            <aside className="rounded-3xl bg-slate-950 p-7 text-white sm:p-9">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-400">
                Project Details
              </p>

              <div className="mt-7 divide-y divide-white/10">
                {[
                  ["Client", project.client || "Private Client"],
                  ["Location", project.location || "Nigeria"],
                  ["Year", project.year || "—"],
                  ["Duration", project.duration || "—"],
                  ["Status", project.status || "—"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex items-start justify-between gap-5 py-4 first:pt-0 last:pb-0"
                  >
                    <span className="text-sm text-slate-400">{label}</span>

                    <span className="text-right text-sm font-bold text-white">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </section>

        {/* ======================================================
            TECHNOLOGIES
        ======================================================= */}
        {technologies.length > 0 && (
          <section className="bg-slate-50 py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
                Technology & Equipment
              </p>

              <h2 className="mt-3 text-3xl font-black sm:text-4xl">
                What powered the project.
              </h2>

              <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {technologies.map((technology, index) => (
                  <div
                    key={`${technology}-${index}`}
                    className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-sm font-black text-blue-600">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <p className="mt-5 font-bold text-slate-900">
                      {technology}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ======================================================
            TECHNICAL SPECIFICATIONS
        ======================================================= */}
        {specifications.length > 0 && (
          <section className="py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl">
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
                  Technical Specifications
                </p>

                <h2 className="mt-3 text-3xl font-black sm:text-4xl">
                  Built around the requirements.
                </h2>
              </div>

              <div className="mt-10 overflow-hidden rounded-3xl border border-slate-200">
                <div className="divide-y divide-slate-200">
                  {specifications.map((specification, index) => {
                    if (
                      typeof specification === "string" ||
                      typeof specification !== "object"
                    ) {
                      return (
                        <div
                          key={index}
                          className="px-6 py-5 text-sm font-medium text-slate-700"
                        >
                          {specification}
                        </div>
                      );
                    }

                    return (
                      <div
                        key={index}
                        className="grid gap-2 px-6 py-5 sm:grid-cols-2"
                      >
                        <span className="text-sm font-bold text-slate-500">
                          {specification.label ||
                            specification.name ||
                            "Specification"}
                        </span>

                        <span className="text-sm font-semibold text-slate-900 sm:text-right">
                          {specification.value || specification.description}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ======================================================
            RESULTS
        ======================================================= */}
        {results.length > 0 && (
          <section className="bg-slate-950 py-20 text-white sm:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl">
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-400">
                  Project Results
                </p>

                <h2 className="mt-3 text-3xl font-black sm:text-4xl">
                  What the solution delivered.
                </h2>
              </div>

              <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {results.map((result, index) => (
                  <div
                    key={index}
                    className="rounded-3xl border border-white/10 bg-white/[0.04] p-7"
                  >
                    <div className="text-3xl font-black text-blue-400">
                      {typeof result === "object"
                        ? result.value || result.metric || ""
                        : "✓"}
                    </div>

                    <p className="mt-4 leading-7 text-slate-300">
                      {typeof result === "object"
                        ? result.label ||
                          result.description ||
                          result.text ||
                          ""
                        : result}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ======================================================
            BEFORE / AFTER
        ======================================================= */}
        {project.beforeAfter?.enabled &&
          project.beforeAfter.before?.image &&
          project.beforeAfter.after?.image && (
          <section className="py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl">
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
                  Transformation
                </p>

                <h2 className="mt-3 text-3xl font-black sm:text-4xl">
                  Before & After
                </h2>
              </div>

              <div className="mt-10 grid gap-6 md:grid-cols-2">
                {[
                  ["Before", project.beforeAfter.before],
                  ["After", project.beforeAfter.after],
                ].map(([label, image]) => (
                  <div key={label}>
                    <div className="mb-3 flex items-center justify-between">
                      <h3 className="font-black">{label}</h3>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedImage(image.image)}
                      className="block w-full overflow-hidden rounded-3xl bg-slate-100"
                    >
                      <img
                        src={image.image}
                        alt={`${project.title} - ${label}`}
                        loading="lazy"
                        className="aspect-[4/3] w-full object-cover transition duration-500 hover:scale-105"
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ======================================================
            TIMELINE
        ======================================================= */}
        {timeline.length > 0 && (
          <section className="bg-slate-50 py-20">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
                  Project Process
                </p>

                <h2 className="mt-3 text-3xl font-black sm:text-4xl">
                  From idea to execution.
                </h2>
              </div>

              <div className="mt-12 space-y-5">
                {timeline.map((step, index) => (
                  <div
                    key={index}
                    className="flex gap-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-950 text-sm font-black text-white">
                      {index + 1}
                    </div>

                    <div>
                      {typeof step === "object" ? (
                        <>
                          <h3 className="font-black text-slate-950">
                            {step.title || step.name || `Step ${index + 1}`}
                          </h3>

                          <p className="mt-2 leading-7 text-slate-600">
                            {step.description || step.text || ""}
                          </p>
                        </>
                      ) : (
                        <p className="pt-1 font-semibold leading-7 text-slate-700">
                          {step}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ======================================================
            TESTIMONIAL
        ======================================================= */}
        {project.testimonial && (
          <section className="py-20 sm:py-24">
            <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-3xl text-blue-600">
                "
              </div>

              <blockquote className="mt-7 text-2xl font-bold leading-relaxed text-slate-900 sm:text-3xl">
                {typeof project.testimonial === "object"
                  ? project.testimonial.quote
                  : project.testimonial}
              </blockquote>

              {typeof project.testimonial === "object" &&
                project.testimonial.name && (
                  <p className="mt-6 text-sm font-bold text-slate-500">
                    {project.testimonial.name}
                    {project.testimonial.role
                      ? ` · ${project.testimonial.role}`
                      : ""}
                  </p>
                )}
            </div>
          </section>
        )}

        {/* ======================================================
            SOCIAL MEDIA
        ======================================================= */}
        {Object.values(project.socialLinks || {}).some(Boolean) && (
          <section className="border-y border-slate-200 bg-slate-50 py-14">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-center">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
                    Follow The Work
                  </p>

                  <h2 className="mt-2 text-2xl font-black sm:text-3xl">
                    See project updates on social media.
                  </h2>
                </div>

                <div className="flex flex-wrap gap-3">
                  {/* FACEBOOK */}
                  {project.socialLinks.facebook && (
                    <a
                      href={project.socialLinks.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook"
                      className="group flex items-center gap-3 rounded-xl bg-[#1877F2] px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-5 w-5"
                        aria-hidden="true"
                      >
                        <path d="M13.5 22v-8h2.75l.5-3h-3.25V9.05c0-.87.43-1.55 1.67-1.55h1.76V4.82c-.31-.04-1.38-.14-2.63-.14-2.6 0-4.38 1.59-4.38 4.5V11H7v3h2.92v8h3.58Z" />
                      </svg>

                      <span>Facebook</span>
                    </a>
                  )}

                  {/* INSTAGRAM */}
                  {project.socialLinks.instagram && (
                    <a
                      href={project.socialLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                      className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
                    >
                      <span
                        className="flex h-5 w-5 items-center justify-center rounded-[6px] bg-gradient-to-br from-[#833AB4] via-[#E1306C] to-[#FCAF45] text-white"
                        aria-hidden="true"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          className="h-3.5 w-3.5"
                        >
                          <rect
                            x="3"
                            y="3"
                            width="18"
                            height="18"
                            rx="5"
                            stroke="currentColor"
                            strokeWidth="2.3"
                          />

                          <circle
                            cx="12"
                            cy="12"
                            r="4"
                            stroke="currentColor"
                            strokeWidth="2.3"
                          />

                          <circle
                            cx="17.5"
                            cy="6.5"
                            r="1.2"
                            fill="currentColor"
                          />
                        </svg>
                      </span>

                      <span>Instagram</span>
                    </a>
                  )}

                  {/* YOUTUBE */}
                  {project.socialLinks.youtube && (
                    <a
                      href={project.socialLinks.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="YouTube"
                      className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
                    >
                      <span className="text-[#FF0000]" aria-hidden="true">
                        <svg
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="h-5 w-5"
                        >
                          <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.5v-7l6.2 3.5-6.2 3.5Z" />
                        </svg>
                      </span>

                      <span>YouTube</span>
                    </a>
                  )}

                  {/* TIKTOK */}
                  {project.socialLinks.tiktok && (
                    <a
                      href={project.socialLinks.tiktok}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="TikTok"
                      className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-400 hover:shadow-lg"
                    >
                      <span className="relative flex h-5 w-5 items-center justify-center">
                        {/* TikTok cyan shadow */}
                        <svg
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="absolute -left-[1px] top-[1px] h-5 w-5 text-[#25F4EE]"
                          aria-hidden="true"
                        >
                          <path d="M19.6 8.2a5.8 5.8 0 0 1-3.7-1.3v7.3a5.8 5.8 0 1 1-5.8-5.8c.4 0 .8 0 1.2.1v3a2.8 2.8 0 1 0 1.6 2.6V2h3a5.8 5.8 0 0 0 3.7 3.7v2.5Z" />
                        </svg>

                        {/* TikTok red shadow */}
                        <svg
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="absolute left-[1px] top-0 h-5 w-5 text-[#FE2C55]"
                          aria-hidden="true"
                        >
                          <path d="M19.6 8.2a5.8 5.8 0 0 1-3.7-1.3v7.3a5.8 5.8 0 1 1-5.8-5.8c.4 0 .8 0 1.2.1v3a2.8 2.8 0 1 0 1.6 2.6V2h3a5.8 5.8 0 0 0 3.7 3.7v2.5Z" />
                        </svg>

                        {/* TikTok main icon */}
                        <svg
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="relative h-5 w-5 text-slate-950"
                          aria-hidden="true"
                        >
                          <path d="M19.6 8.2a5.8 5.8 0 0 1-3.7-1.3v7.3a5.8 5.8 0 1 1-5.8-5.8c.4 0 .8 0 1.2.1v3a2.8 2.8 0 1 0 1.6 2.6V2h3a5.8 5.8 0 0 0 3.7 3.7v2.5Z" />
                        </svg>
                      </span>

                      <span>TikTok</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ======================================================
            TAGS
        ======================================================= */}
        {tags.length > 0 && (
          <section className="py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-slate-100 px-4 py-2 text-xs font-bold text-slate-600"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ======================================================
            RELATED PROJECTS
        ======================================================= */}
        {relatedProjects.length > 0 && (
          <section className="bg-slate-50 py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
                    More Work
                  </p>

                  <h2 className="mt-3 text-3xl font-black sm:text-4xl">
                    Related projects.
                  </h2>
                </div>

                <Link
                  to="/projects"
                  className="text-sm font-bold text-blue-600 hover:text-blue-700"
                >
                  View all projects →
                </Link>
              </div>

              <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {relatedProjects.map((relatedProject) => (
                  <Link
                    key={relatedProject.slug}
                    to={`/projects/${relatedProject.slug}`}
                    className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="overflow-hidden">
                      <img
                        src={
                          relatedProject.heroImage ||
                          relatedProject.image ||
                          relatedProject.gallery?.[0]?.image ||
                          relatedProject.gallery?.[0]
                        }
                        alt={relatedProject.title}
                        loading="lazy"
                        className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-105"
                      />
                    </div>

                    <div className="p-6">
                      <p className="text-xs font-bold uppercase tracking-[0.15em] text-blue-600">
                        {relatedProject.category}
                      </p>

                      <h3 className="mt-2 text-xl font-black">
                        {relatedProject.title}
                      </h3>

                      <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">
                        {relatedProject.summary}
                      </p>

                      <span className="mt-5 inline-block text-sm font-bold text-slate-950">
                        View project →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ======================================================
            PREVIOUS / NEXT
        ======================================================= */}
        {(previousProject || nextProject) && (
          <section className="border-t border-slate-200 py-10">
            <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 px-4 sm:flex-row sm:px-6 lg:px-8">
              {previousProject ? (
                <Link
                  to={`/projects/${previousProject.slug}`}
                  className="group rounded-2xl border border-slate-200 p-5 transition hover:border-blue-200 hover:shadow-md"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-slate-400">
                    Previous Project
                  </p>

                  <p className="mt-2 font-black text-slate-900 transition group-hover:text-blue-600">
                    ← {previousProject.title}
                  </p>
                </Link>
              ) : (
                <div />
              )}

              {nextProject ? (
                <Link
                  to={`/projects/${nextProject.slug}`}
                  className="group rounded-2xl border border-slate-200 p-5 text-left transition hover:border-blue-200 hover:shadow-md sm:text-right"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-slate-400">
                    Next Project
                  </p>

                  <p className="mt-2 font-black text-slate-900 transition group-hover:text-blue-600">
                    {nextProject.title} →
                  </p>
                </Link>
              ) : (
                <div />
              )}
            </div>
          </section>
        )}

        {/* ======================================================
            FINAL CTA
        ======================================================= */}
        <section className="bg-slate-950 py-20 text-white sm:py-24">
          <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-400">
              Have a similar challenge?
            </p>

            <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
              Let's build your solution.
            </h2>

            <p className="mx-auto mt-5 max-w-2xl leading-8 text-slate-300">
              Tell us what you need and we'll help you turn the idea into a
              practical, reliable solution.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href={`https://wa.me/2349066218520?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl bg-green-600 px-7 py-4 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-green-500"
              >
                Start a Conversation
              </a>

              <Link
                to="/contact"
                className="rounded-xl border border-white/15 bg-white/10 px-7 py-4 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-white/15"
              >
                Contact Us
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={shareOnWhatsApp}
                className="rounded-lg border border-white/10 px-4 py-2 text-xs font-bold text-slate-300 transition hover:border-green-400/40 hover:text-green-400"
              >
                Share on WhatsApp
              </button>

              <button
                type="button"
                onClick={shareOnFacebook}
                className="rounded-lg border border-white/10 px-4 py-2 text-xs font-bold text-slate-300 transition hover:border-blue-400/40 hover:text-blue-400"
              >
                Share on Facebook
              </button>

              <button
                type="button"
                onClick={copyLink}
                className="rounded-lg border border-white/10 px-4 py-2 text-xs font-bold text-slate-300 transition hover:border-white/30 hover:text-white"
              >
                Copy Link
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* ======================================================
          IMAGE LIGHTBOX
      ======================================================= */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/95 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            type="button"
            onClick={() => setSelectedImage(null)}
            aria-label="Close image"
            className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-2xl text-white backdrop-blur transition hover:bg-white/20"
          >
            ×
          </button>

          <img
            src={selectedImage}
            alt={project.title}
            onClick={(event) => event.stopPropagation()}
            className="max-h-[90vh] max-w-[95vw] rounded-2xl object-contain shadow-2xl"
          />
        </div>
      )}
    </>
  );
}