import SocialLinks from "../components/SocialLinks";

export default function Contact() {
  return (
    <main>
      {/* ======================================================
          HERO
      ======================================================= */}
      <section className="bg-slate-950 py-28 text-white">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-slate-500">
            Contact Us
          </p>

          <h1 className="mt-5 max-w-4xl text-5xl font-extrabold md:text-7xl">
            Let's build something
            <span className="block text-slate-500">great together.</span>
          </h1>
        </div>
      </section>

      {/* ======================================================
          CONTACT + FORM
      ======================================================= */}
      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-5">
            {/* ==================================================
                CONTACT DETAILS
            =================================================== */}
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-extrabold text-slate-950">
                Get in touch
              </h2>

              <p className="mt-5 leading-7 text-slate-600">
                Tell us what you need. Whether it's a new website, solar
                installation, electrical work, CCTV system or something
                completely custom, we'd love to hear from you.
              </p>

              {/* CONTACT INFORMATION */}
              <div className="mt-10 space-y-7">
                {/* PHONE */}
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                    Phone
                  </p>

                  <a
                    href="tel:2349066218520"
                    className="mt-2 block text-xl font-bold text-slate-950 transition hover:text-blue-600">
                    +2349066218520
                  </a>
                </div>

                {/* EMAIL */}
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                    Email
                  </p>

                  <a
                    href="mailto:harryinnotech@gmail.com"
                    className="mt-2 block break-all text-xl font-bold text-slate-950 transition hover:text-blue-600">
                    harryinnotech@gmail.com
                  </a>
                </div>

                {/* WHATSAPP */}
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                    WhatsApp
                  </p>

                  <a
                    href="https://wa.me/2349066218520"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-xl font-bold text-slate-950 transition hover:text-green-600">
                    Chat with us →
                  </a>
                </div>

                {/* LOCATION */}
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                    Location
                  </p>

                  <p className="mt-2 text-xl font-bold text-slate-950">
                    Benin City, Edo State, Nigeria
                  </p>
                </div>
              </div>

              {/* ==================================================
                  SOCIAL MEDIA
              =================================================== */}
              <div className="mt-12 border-t border-slate-200 pt-8">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
                  Follow Us
                </p>

                <h3 className="mt-2 text-2xl font-extrabold text-slate-950">
                  Stay connected
                </h3>

                <p className="mt-3 max-w-md text-sm leading-7 text-slate-600">
                  Follow Harry Innovative Technologies for project updates, new
                  technology solutions, installations, repairs and
                  behind-the-scenes content.
                </p>

                <div className="mt-5">
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
            </div>

            {/* ==================================================
                PROJECT ENQUIRY FORM
            =================================================== */}
            <div className="rounded-3xl bg-white p-7 shadow-xl md:p-10 lg:col-span-3">
              <h2 className="text-2xl font-extrabold text-slate-950">
                Tell us about your project
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Fill out the form below and we'll help you figure out the right
                solution.
              </p>

              <form
                className="mt-8 space-y-5"
                onSubmit={(e) => {
                  e.preventDefault();

                  const form = e.currentTarget;
                  const data = new FormData(form);

                  const name = data.get("name");
                  const phone = data.get("phone");
                  const service = data.get("service");
                  const message = data.get("message");

                  const whatsappMessage = encodeURIComponent(
                    `Hello Harry Innovative Technologies.\n\nName: ${name}\nPhone: ${phone}\nService: ${service}\n\nProject details:\n${message}`,
                  );

                  window.open(
                    `https://wa.me/2349066218520?text=${whatsappMessage}`,
                    "_blank",
                  );
                }}>
                {/* NAME + PHONE */}
                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-bold">
                      Your Name
                    </label>

                    <input
                      name="name"
                      type="text"
                      required
                      placeholder="John Doe"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 outline-none transition focus:border-slate-950 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-bold">
                      Phone Number
                    </label>

                    <input
                      name="phone"
                      type="tel"
                      required
                      placeholder="+2349066218520"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 outline-none transition focus:border-slate-950 focus:bg-white"
                    />
                  </div>
                </div>

                {/* SERVICE */}
                <div>
                  <label className="mb-2 block text-sm font-bold">
                    Service
                  </label>

                  <select
                    name="service"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 outline-none transition focus:border-slate-950">
                    <option>Solar Installation</option>
                    <option>Electrical Services</option>
                    <option>Web Design & Development</option>
                    <option>CCTV & Security</option>
                    <option>Electronics Repair</option>
                    <option>Automation</option>
                    <option>Building Plans</option>
                    <option>Other</option>
                  </select>
                </div>

                {/* PROJECT DETAILS */}
                <div>
                  <label className="mb-2 block text-sm font-bold">
                    Project Details
                  </label>

                  <textarea
                    name="message"
                    required
                    rows="6"
                    placeholder="Tell us what you need..."
                    className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 outline-none transition focus:border-slate-950 focus:bg-white"></textarea>
                </div>

                {/* SUBMIT */}
                <button
                  type="submit"
                  className="group relative w-full overflow-hidden rounded-xl bg-slate-950 px-6 py-4 font-bold text-white transition hover:bg-slate-800">
                  <span className="relative z-10">
                    Send Enquiry via WhatsApp →
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
