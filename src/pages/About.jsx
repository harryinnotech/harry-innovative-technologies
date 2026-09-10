export default function About() {
  return (
    <main>

      <section className="relative overflow-hidden bg-slate-950 py-28 text-white">

        {/* Replace this image with your company/team photo */}
        <img
          src="https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=2200&q=85"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />

        <div className="absolute inset-0 bg-slate-950/75"></div>

        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">

          <p className="text-sm font-bold uppercase tracking-[0.25em] text-slate-400">
            About Harry Innovative Technologies
          </p>

          <h1 className="mt-5 max-w-4xl text-5xl font-extrabold md:text-7xl">
            We build solutions
            <span className="block text-slate-500">
              that make a difference.
            </span>
          </h1>

        </div>
      </section>

      <section className="bg-white py-24">

        <div className="mx-auto max-w-7xl px-5 lg:px-8">

          <div className="grid gap-16 lg:grid-cols-2">

            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-slate-500">
                Who We Are
              </p>

              <h2 className="mt-5 text-4xl font-extrabold text-slate-950">
                Engineering. Technology. Creativity.
              </h2>
            </div>

            <div className="text-lg leading-8 text-slate-600">
              <p>
                Harry Innovative Technologies is a technology and
                engineering solutions company focused on helping
                individuals and businesses solve everyday problems
                through technology.
              </p>

              <p className="mt-6">
                Our work spans solar energy, electrical services,
                digital solutions, security systems, electronics,
                automation and building-related technical services.
              </p>

              <p className="mt-6">
                We believe that the best solution is one that is
                practical, reliable, maintainable and built around
                the customer's actual needs.
              </p>
            </div>

          </div>

          <div className="mt-20 grid gap-6 md:grid-cols-3">

            <div className="rounded-3xl bg-slate-950 p-8 text-white">
              <p className="text-sm font-bold uppercase tracking-widest text-slate-500">
                01
              </p>

              <h3 className="mt-8 text-2xl font-bold">
                Our Mission
              </h3>

              <p className="mt-4 leading-7 text-slate-400">
                To provide dependable technology and engineering
                solutions that create real value for our customers.
              </p>
            </div>

            <div className="rounded-3xl bg-slate-100 p-8">
              <p className="text-sm font-bold uppercase tracking-widest text-slate-400">
                02
              </p>

              <h3 className="mt-8 text-2xl font-bold">
                Our Vision
              </h3>

              <p className="mt-4 leading-7 text-slate-600">
                To become a trusted technology solutions provider
                known for innovation, reliability and excellence.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 p-8">
              <p className="text-sm font-bold uppercase tracking-widest text-slate-400">
                03
              </p>

              <h3 className="mt-8 text-2xl font-bold">
                Our Values
              </h3>

              <p className="mt-4 leading-7 text-slate-600">
                Integrity, innovation, quality, professionalism and
                customer satisfaction.
              </p>
            </div>

          </div>

        </div>
      </section>

    </main>
  );
}