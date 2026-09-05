import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import projects from "../data/projects";
import SocialLinks from "../components/SocialLinks";

export default function ProjectDetails() {
  const { slug } = useParams();

  const projectIndex = projects.findIndex((item) => item.slug === slug);
  const project = projects[projectIndex];

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [showShare, setShowShare] = useState(false);

  /*
   * ============================================================
   * LIGHTBOX KEYBOARD CONTROLS
   * ============================================================
   */
  useEffect(() => {
    if (!lightboxOpen || !project?.gallery?.length) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setLightboxOpen(false);
      }

      if (event.key === "ArrowRight") {
        setActiveImage((current) =>
          current === project.gallery.length - 1 ? 0 : current + 1,
        );
      }

      if (event.key === "ArrowLeft") {
        setActiveImage((current) =>
          current === 0 ? project.gallery.length - 1 : current - 1,
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxOpen, project]);

  /*
   * ============================================================
   * LOCK PAGE SCROLL WHEN LIGHTBOX IS OPEN
   * ============================================================
   */
  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxOpen]);

  /*
   * ============================================================
   * RELATED PROJECTS
   * ============================================================
   */
  const relatedProjects = useMemo(() => {
    if (!project) return [];

    const sameCategory = projects.filter(
      (item) =>
        item.slug !== project.slug && item.category === project.category,
    );

    const remaining = projects.filter(
      (item) =>
        item.slug !== project.slug && item.category !== project.category,
    );

    return [...sameCategory, ...remaining].slice(0, 3);
  }, [project]);

  /*
   * ============================================================
   * PROJECT NOT FOUND
   * ============================================================
   */
  if (!project) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 pt-24 text-white">
        <div className="max-w-xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-blue-400">
            404
          </p>

          <h1 className="mt-4 text-4xl font-black sm:text-6xl">
            Project not found.
          </h1>

          <p className="mt-5 leading-8 text-slate-400">
            The project you're looking for doesn't exist or may have been
            moved.
          </p>

          <Link
            to="/projects"
            className="mt-8 inline-flex rounded-xl bg-white px-6 py-3 font-bold text-slate-950 transition hover:bg-slate-200"
          >
            ← Back to Projects
          </Link>
        </div>
      </main>
    );
  }

  /*
   * ============================================================
   * NAVIGATION
   * ============================================================
   */
  const previousProject =
    projects[(projectIndex - 1 + projects.length) % projects.length];

  const nextProject = projects[(projectIndex + 1) % projects.length];

  /*
   * ============================================================
   * WHATSAPP MESSAGE
   * ============================================================
   */
  const whatsappMessage = encodeURIComponent(
    `Hello Harry Innovative Technologies, I would like to discuss a project similar to "${project.title}".`,
  );

  /*
   * ============================================================
   * SHARE
   * ============================================================
   */
  const shareUrl = window.location.href;

  const shareOnWhatsApp = () => {
    const message = encodeURIComponent(`${project.shareText}\n\n${shareUrl}`);

    window.open(
      `https://wa.me/?text=${message}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  const shareOnFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        shareUrl,
      )}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  const copyProjectLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      alert("Project link copied!");
    } catch {
      alert("Unable to copy the link.");
    }
  };

  /*
   * ============================================================
   * HERO
   * ============================================================
   */
  return (
    <main className="bg-white text-slate-950">
      {/* ======================================================
          HERO
      ======================================================= */}
      <section className="relative overflow-hidden bg-slate-950 pt-28 text-white">
        <div className="absolute inset-0">
          {/* Replace this stock image with your real project image. */}
          <img
            src={project.image}
            alt=""
            className="h-full w-full object-cover opacity-30"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/40" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-300 transition hover:text-white"
          >
            ← Back to Projects
          </Link>

          <div className="mt-12 max-w-5xl">
            <div className="flex flex-wrap gap-3">
              <span className="rounded-full bg-green-500/15 px-4 py-2 text-xs font-bold uppercase tracking-wider text-green-400 ring-1 ring-green-400/20">
                {project.category}
              </span>

              <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-bold text-slate-300">
                {project.status}
              </span>
            </div>

            <h1 className="mt-6 text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl lg:text-8xl">
              {project.title}
            </h1>

            <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300">
              {project.description}
            </p>

            <div className="mt-9 flex flex-wrap gap-x-7 gap-y-3 text-sm font-semibold text-slate-300">
              <span>{project.year}</span>
              <span>•</span>
              <span>{project.location}</span>
              <span>•</span>
              <span>{project.client}</span>
            </div>

            {/* SHARE */}
            <div className="relative mt-9">
              <button
                type="button"
                onClick={() => setShowShare(!showShare)}
                className="rounded-xl border border-white/15 bg-white/10 px-5 py-3 text-sm font-bold backdrop-blur transition hover:bg-white/15"
              >
                ↗ Share Project
              </button>

              {showShare && (
                <div className="absolute left-0 top-14 z-20 flex min-w-[210px] flex-col gap-1 rounded-2xl border border-white/10 bg-slate-900 p-2 shadow-2xl">
                  <button
                    type="button"
                    onClick={shareOnWhatsApp}
                    className="rounded-xl px-4 py-3 text-left text-sm font-semibold text-white hover:bg-white/10"
                  >
                    Share on WhatsApp
                  </button>

                  <button
                    type="button"
                    onClick={shareOnFacebook}
                    className="rounded-xl px-4 py-3 text-left text-sm font-semibold text-white hover:bg-white/10"
                  >
                    Share on Facebook
                  </button>

                  <button
                    type="button"
                    onClick={copyProjectLink}
                    className="rounded-xl px-4 py-3 text-left text-sm font-semibold text-white hover:bg-white/10"
                  >
                    Copy Project Link
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================
          GALLERY
          Featured image + compact horizontal scrolling gallery
      ======================================================= */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
                Project Gallery
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
                See the work.
              </h2>
            </div>

            <p className="text-sm font-semibold text-slate-500">
              {project.gallery.length} photos
            </p>
          </div>

          {/* FEATURED IMAGE */}
          {project.gallery.length > 0 && (
            <button
              type="button"
              onClick={() => {
                setActiveImage(0);
                setLightboxOpen(true);
              }}
              className="group relative mt-8 block aspect-[16/8] w-full overflow-hidden rounded-3xl bg-slate-100 text-left"
            >
              {/* Replace this stock image with your real project image. */}
              <img
                src={project.gallery[0].image}
                alt={project.gallery[0].caption}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4 text-white sm:bottom-7 sm:left-7 sm:right-7">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Featured Project Image
                  </p>

                  <p className="mt-1 text-lg font-black sm:text-xl">
                    {project.gallery[0].caption}
                  </p>
                </div>

                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-lg text-slate-950 shadow-xl transition duration-300 group-hover:scale-110">
                  ↗
                </span>
              </div>
            </button>
          )}

          {/* SCROLLABLE PHOTO STRIP */}
          {project.gallery.length > 1 && (
            <div className="relative mt-5">
              <div
                className="flex gap-4 overflow-x-auto pb-4"
                style={{
                  scrollbarWidth: "thin",
                  WebkitOverflowScrolling: "touch",
                }}
              >
                {project.gallery.slice(1).map((item, index) => {
                  const actualIndex = index + 1;

                  return (
                    <button
                      key={`${item.image}-${actualIndex}`}
                      type="button"
                      onClick={() => {
                        setActiveImage(actualIndex);
                        setLightboxOpen(true);
                      }}
                      className="group relative w-[190px] shrink-0 overflow-hidden rounded-2xl bg-slate-100 text-left sm:w-[230px] lg:w-[260px]"
                    >
                      <div className="aspect-[4/3] overflow-hidden">
                        {/* Replace this stock image with your real project image. */}
                        <img
                          src={item.image}
                          alt={item.caption}
                          loading="lazy"
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                      </div>

                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />

                      <div className="absolute bottom-3 left-3 right-3">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-300">
                          Image {String(actualIndex + 1).padStart(2, "0")}
                        </p>

                        <p className="mt-1 line-clamp-2 text-sm font-bold text-white">
                          {item.caption}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Scroll hint */}
              <div className="pointer-events-none absolute right-0 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/90 px-4 py-2 text-xs font-bold text-slate-600 shadow-lg lg:block">
                Scroll →
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ======================================================
          VIDEO
      ======================================================= */}
      {project.video?.enabled && project.video.youtubeUrl && (
        <section className="bg-slate-950 py-20 text-white sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-green-400">
                Project Video
              </p>

              <h2 className="mt-4 text-3xl font-black sm:text-5xl">
                {project.video.title}
              </h2>

              <p className="mt-5 leading-8 text-slate-400">
                {project.video.description}
              </p>
            </div>

            <div className="mt-10 aspect-video overflow-hidden rounded-3xl border border-white/10 bg-black shadow-2xl">
              <iframe
                src={project.video.youtubeUrl.replace(
                  "watch?v=",
                  "embed/",
                )}
                title={project.video.title}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </section>
      )}

      {/* ======================================================
          PROJECT OVERVIEW
      ======================================================= */}
      <section className="border-y border-slate-200 bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-14 lg:grid-cols-[1fr_340px]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
                Project Overview
              </p>

              <h2 className="mt-4 text-3xl font-black sm:text-5xl">
                From problem to solution.
              </h2>

              {/* CHALLENGE */}
              <div className="mt-12">
                <p className="text-sm font-bold uppercase tracking-wider text-slate-400">
                  01 — The Challenge
                </p>

                <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
                  {project.challenge}
                </p>
              </div>

              {/* APPROACH */}
              {project.approach && (
                <div className="mt-12">
                  <p className="text-sm font-bold uppercase tracking-wider text-slate-400">
                    02 — Our Approach
                  </p>

                  <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
                    {project.approach}
                  </p>
                </div>
              )}

              {/* SOLUTION */}
              <div className="mt-12">
                <p className="text-sm font-bold uppercase tracking-wider text-slate-400">
                  03 — The Solution
                </p>

                <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
                  {project.solution}
                </p>
              </div>

              {/* RESULT */}
              <div className="mt-12">
                <p className="text-sm font-bold uppercase tracking-wider text-slate-400">
                  04 — The Result
                </p>

                <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
                  {project.result}
                </p>
              </div>
            </div>

            {/* PROJECT DETAILS */}
            <aside className="h-fit rounded-3xl bg-slate-950 p-7 text-white shadow-xl lg:sticky lg:top-28">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                Project Details
              </p>

              <div className="mt-7 divide-y divide-white/10">
                <div className="py-5 first:pt-0">
                  <p className="text-xs text-slate-500">Category</p>
                  <p className="mt-1 font-bold">{project.category}</p>
                </div>

                <div className="py-5">
                  <p className="text-xs text-slate-500">Client</p>
                  <p className="mt-1 font-bold">{project.client}</p>
                </div>

                <div className="py-5">
                  <p className="text-xs text-slate-500">Location</p>
                  <p className="mt-1 font-bold">{project.location}</p>
                </div>

                <div className="py-5">
                  <p className="text-xs text-slate-500">Year</p>
                  <p className="mt-1 font-bold">{project.year}</p>
                </div>

                <div className="py-5">
                  <p className="text-xs text-slate-500">Duration</p>
                  <p className="mt-1 font-bold">{project.duration}</p>
                </div>

                <div className="py-5">
                  <p className="text-xs text-slate-500">Status</p>
                  <p className="mt-1 font-bold text-green-400">
                    {project.status}
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ======================================================
          TECHNOLOGIES
      ======================================================= */}
      {project.technologies?.length > 0 && (
        <section className="bg-slate-50 py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
              Technologies & Equipment
            </p>

            <h2 className="mt-4 text-3xl font-black sm:text-5xl">
              What went into the solution.
            </h2>

            <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {project.technologies.map((technology, index) => (
                <div
                  key={technology}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <span className="text-xs font-bold text-blue-600">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <p className="mt-3 font-bold text-slate-800">
                    {technology}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ======================================================
          SPECIFICATIONS
      ======================================================= */}
      {project.specifications?.length > 0 && (
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
              Technical Specifications
            </p>

            <h2 className="mt-4 text-3xl font-black sm:text-5xl">
              The technical details.
            </h2>

            <div className="mt-10 overflow-hidden rounded-3xl border border-slate-200">
              {project.specifications.map((specification, index) => (
                <div
                  key={specification.label}
                  className={`grid gap-2 px-6 py-5 sm:grid-cols-2 sm:px-8 ${
                    index % 2 === 0 ? "bg-slate-50" : "bg-white"
                  }`}
                >
                  <p className="text-sm font-semibold text-slate-500">
                    {specification.label}
                  </p>

                  <p className="font-bold text-slate-900 sm:text-right">
                    {specification.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ======================================================
          RESULTS
      ======================================================= */}
      {project.results?.length > 0 && (
        <section className="bg-slate-950 py-20 text-white sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-green-400">
              Project Results
            </p>

            <h2 className="mt-4 max-w-3xl text-3xl font-black sm:text-5xl">
              What the project achieved.
            </h2>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {project.results.map((result) => (
                <div
                  key={result.label}
                  className="rounded-3xl border border-white/10 bg-white/5 p-7"
                >
                  <p className="text-4xl font-black sm:text-5xl">
                    {result.value}
                  </p>

                  <p className="mt-3 text-sm leading-6 text-slate-400">
                    {result.label}
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
      {project.beforeAfter?.enabled && (
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
              Before & After
            </p>

            <h2 className="mt-4 text-3xl font-black sm:text-5xl">
              The transformation.
            </h2>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {/* BEFORE */}
              <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                <div className="aspect-video overflow-hidden">
                  {/* Replace with real BEFORE image. */}
                  <img
                    src={project.beforeAfter.before.image}
                    alt="Before project"
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="p-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Before
                  </span>

                  <h3 className="mt-2 text-2xl font-black">
                    {project.beforeAfter.before.title}
                  </h3>

                  <p className="mt-3 leading-7 text-slate-600">
                    {project.beforeAfter.before.description}
                  </p>
                </div>
              </div>

              {/* AFTER */}
              <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                <div className="aspect-video overflow-hidden">
                  {/* Replace with real AFTER image. */}
                  <img
                    src={project.beforeAfter.after.image}
                    alt="After project"
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="p-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-green-600">
                    After
                  </span>

                  <h3 className="mt-2 text-2xl font-black">
                    {project.beforeAfter.after.title}
                  </h3>

                  <p className="mt-3 leading-7 text-slate-600">
                    {project.beforeAfter.after.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ======================================================
          TIMELINE
      ======================================================= */}
      {project.timeline?.length > 0 && (
        <section className="bg-slate-50 py-20 sm:py-28">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="text-center">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
                Project Timeline
              </p>

              <h2 className="mt-4 text-3xl font-black sm:text-5xl">
                How we built it.
              </h2>
            </div>

            <div className="relative mt-14">
              <div className="absolute bottom-0 left-[23px] top-0 w-px bg-slate-200 sm:left-1/2 sm:-translate-x-1/2" />

              <div className="space-y-10">
                {project.timeline.map((item, index) => (
                  <div
                    key={item.step}
                    className={`relative grid gap-6 sm:grid-cols-2 sm:gap-14 ${
                      index % 2 === 0 ? "" : "sm:text-right"
                    }`}
                  >
                    <div
                      className={`pl-14 sm:pl-0 ${
                        index % 2 === 0
                          ? "sm:pr-14"
                          : "sm:order-2 sm:pl-14"
                      }`}
                    >
                      <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
                        Step {item.step}
                      </p>

                      <h3 className="mt-2 text-2xl font-black">
                        {item.title}
                      </h3>

                      <p className="mt-3 leading-7 text-slate-600">
                        {item.description}
                      </p>
                    </div>

                    <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-full border-4 border-slate-50 bg-slate-950 text-xs font-black text-white sm:left-1/2 sm:-translate-x-1/2">
                      {item.step}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ======================================================
          TESTIMONIAL
      ======================================================= */}
      {project.testimonial?.enabled && (
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
              Client Feedback
            </p>

            <div className="mt-8 text-5xl text-slate-200">“</div>

            <blockquote className="mt-2 text-2xl font-bold leading-10 text-slate-800 sm:text-4xl">
              {project.testimonial.quote}
            </blockquote>

            <div className="mt-8">
              <p className="font-black text-slate-950">
                {project.testimonial.name}
              </p>

              <p className="mt-1 text-sm text-slate-500">
                {project.testimonial.role}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ======================================================
          SOCIAL MEDIA
      ======================================================= */}
      {Object.values(project.socialLinks || {}).some(Boolean) && (
        <section className="border-y border-slate-200 bg-slate-50 py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
              <div className="max-w-2xl">
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
                  Follow The Work
                </p>

                <h2 className="mt-2 text-2xl font-black text-slate-950 sm:text-3xl">
                  See project updates on social media.
                </h2>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  Follow Harry Innovative Technologies for project updates,
                  installations, technology solutions, repairs and
                  behind-the-scenes content.
                </p>
              </div>

              {/* Same social icon component used in the Footer */}
              <div className="shrink-0">
                <SocialLinks
                  links={{
                    facebook: project.socialLinks?.facebook,
                    instagram: project.socialLinks?.instagram,
                    youtube: project.socialLinks?.youtube,
                  }}
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ======================================================
          TAGS
      ======================================================= */}
      {project.tags?.length > 0 && (
        <section className="py-10">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 sm:px-6 lg:px-8">
            <span className="mr-2 text-sm font-bold text-slate-400">
              Tags
            </span>

            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-slate-100 px-4 py-2 text-xs font-bold text-slate-600"
              >
                #{tag.replace(/\s+/g, "")}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* ======================================================
          RELATED PROJECTS
      ======================================================= */}
      {relatedProjects.length > 0 && (
        <section className="border-t border-slate-200 py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
              More Work
            </p>

            <h2 className="mt-4 text-3xl font-black sm:text-5xl">
              Explore related projects.
            </h2>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {relatedProjects.map((item) => (
                <Link
                  key={item.slug}
                  to={`/projects/${item.slug}`}
                  className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-500 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    {/* Replace with real project image. */}
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-6">
                    <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
                      {item.category}
                    </p>

                    <h3 className="mt-2 text-2xl font-black">
                      {item.title}
                    </h3>

                    <span className="mt-5 inline-flex font-bold transition group-hover:text-blue-600">
                      View Project →
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
      <section className="border-t border-slate-200">
        <div className="mx-auto grid max-w-7xl md:grid-cols-2">
          <Link
            to={`/projects/${previousProject.slug}`}
            className="group border-b border-slate-200 p-8 transition hover:bg-slate-50 md:border-b-0 md:border-r md:p-12"
          >
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
              Previous Project
            </p>

            <h3 className="mt-3 text-2xl font-black transition group-hover:text-blue-600 sm:text-3xl">
              {previousProject.title}
            </h3>

            <span className="mt-5 inline-flex font-bold">
              ← View Project
            </span>
          </Link>

          <Link
            to={`/projects/${nextProject.slug}`}
            className="group p-8 transition hover:bg-slate-50 md:p-12 md:text-right"
          >
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
              Next Project
            </p>

            <h3 className="mt-3 text-2xl font-black transition group-hover:text-blue-600 sm:text-3xl">
              {nextProject.title}
            </h3>

            <span className="mt-5 inline-flex font-bold">
              View Project →
            </span>
          </Link>
        </div>
      </section>

      {/* ======================================================
          FINAL CTA
      ======================================================= */}
      <section className="overflow-hidden bg-slate-950 py-20 text-white sm:py-28">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-green-400">
            Start Your Project
          </p>

          <h2 className="mt-5 text-4xl font-black tracking-tight sm:text-6xl">
            Have a project
            <span className="block text-blue-400">like this?</span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl leading-8 text-slate-400">
            Tell us what you're trying to achieve and we'll help you find the
            right technical solution.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href={`https://wa.me/2349066218520?text=${whatsappMessage}`}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl bg-green-500 px-7 py-4 font-bold text-white shadow-xl transition hover:-translate-y-1 hover:bg-green-600"
            >
              WhatsApp Us
            </a>

            <Link
              to="/contact"
              className="rounded-xl border border-white/15 bg-white/10 px-7 py-4 font-bold text-white transition hover:bg-white/15"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* ======================================================
          IMAGE LIGHTBOX
      ======================================================= */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4"
          onClick={() => setLightboxOpen(false)}
        >
          {/* CLOSE */}
          <button
            type="button"
            aria-label="Close gallery"
            onClick={() => setLightboxOpen(false)}
            className="absolute right-5 top-5 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-2xl text-white backdrop-blur transition hover:bg-white/20"
          >
            ×
          </button>

          {/* PREVIOUS */}
          <button
            type="button"
            aria-label="Previous image"
            onClick={(event) => {
              event.stopPropagation();

              setActiveImage((current) =>
                current === 0 ? project.gallery.length - 1 : current - 1,
              );
            }}
            className="absolute left-3 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-2xl text-white backdrop-blur transition hover:bg-white/20 sm:left-8"
          >
            ←
          </button>

          {/* IMAGE */}
          <div
            className="relative flex max-h-[90vh] max-w-6xl flex-col items-center"
            onClick={(event) => event.stopPropagation()}
          >
            {/* Replace with your real project image. */}
            <img
              src={project.gallery[activeImage].image}
              alt={project.gallery[activeImage].caption}
              className="max-h-[78vh] max-w-full rounded-xl object-contain shadow-2xl"
            />

            <div className="mt-4 text-center">
              <p className="font-bold text-white">
                {project.gallery[activeImage].caption}
              </p>

              <p className="mt-1 text-sm text-slate-400">
                {activeImage + 1} / {project.gallery.length}
              </p>
            </div>
          </div>

          {/* NEXT */}
          <button
            type="button"
            aria-label="Next image"
            onClick={(event) => {
              event.stopPropagation();

              setActiveImage((current) =>
                current === project.gallery.length - 1 ? 0 : current + 1,
              );
            }}
            className="absolute right-3 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-2xl text-white backdrop-blur transition hover:bg-white/20 sm:right-8"
          >
            →
          </button>
        </div>
      )}
    </main>
  );
}