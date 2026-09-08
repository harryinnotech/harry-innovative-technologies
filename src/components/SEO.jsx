import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const pageMetadata = {
  "/": {
    title: "Harry Innovative Technologies | Technical Solutions in Nigeria",
    description:
      "Web development, solar installation, electrical services, CCTV security, electronics repair and engineering solutions in Nigeria.",
  },
  "/services": {
    title: "Services | Harry Innovative Technologies",
    description:
      "Explore web development, solar, electrical, CCTV, electronics repair, building plans and automation services.",
  },
  "/projects": {
    title: "Projects | Harry Innovative Technologies",
    description:
      "Explore selected technology, energy, electrical, security and engineering projects by Harry Innovative Technologies.",
  },
  "/contact": {
    title: "Contact | Harry Innovative Technologies",
    description:
      "Contact Harry Innovative Technologies in Benin City, Nigeria about your technology, energy or engineering project.",
  },
  "/about": {
    title: "About | Harry Innovative Technologies",
    description:
      "Learn about Harry Innovative Technologies and our practical approach to technology and engineering solutions.",
  },
  "/store": {
    title: "Store | Harry Innovative Technologies",
    description:
      "Explore website development, design, software, SEO and technology services from Harry Innovative Technologies.",
  },
  "/store/checkout": {
    title: "Checkout | Harry Innovative Technologies",
    description:
      "Review your Harry Innovative Technologies store order and continue through WhatsApp.",
  },
};

function setMeta(attribute, value, content) {
  let element = document.head.querySelector(`meta[${attribute}="${value}"]`);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, value);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
}

export default function SEO() {
  const { pathname } = useLocation();

  useEffect(() => {
    const basePath = pathname.startsWith("/projects/")
      ? "/projects"
      : pathname.startsWith("/store/") && pathname !== "/store/checkout"
        ? "/store"
        : pathname;
    const metadata = pageMetadata[basePath] || pageMetadata["/"];
    const canonicalUrl = `${window.location.origin}${pathname}`;

    document.title = metadata.title;
    setMeta("name", "description", metadata.description);
    setMeta("property", "og:title", metadata.title);
    setMeta("property", "og:description", metadata.description);
    setMeta("property", "og:url", canonicalUrl);
    setMeta("name", "twitter:title", metadata.title);
    setMeta("name", "twitter:description", metadata.description);

    let structuredData = document.head.querySelector(
      'script[data-seo="organization"]'
    );

    if (!structuredData) {
      structuredData = document.createElement("script");
      structuredData.type = "application/ld+json";
      structuredData.dataset.seo = "organization";
      document.head.appendChild(structuredData);
    }

    structuredData.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          name: "Harry Innovative Technologies",
          url: window.location.origin,
          logo: `${window.location.origin}/favicon.png`,
          telephone: "+2349066218520",
          email: "harryinnotech@gmail.com",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Benin City",
            addressRegion: "Edo State",
            addressCountry: "NG",
          },
        },
        {
          "@type": "WebSite",
          name: "Harry Innovative Technologies",
          url: window.location.origin,
        },
      ],
    });

    let canonical = document.head.querySelector('link[rel="canonical"]');

    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }

    canonical.setAttribute("href", canonicalUrl);
  }, [pathname]);

  return null;
}