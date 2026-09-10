import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import ProductCard from "../components/store/ProductCard";
import { getProducts } from "../services/productService";

const STORE_CATEGORIES = [
  "All",
  "Digital Services",
  "Solar & Power",
  "Security & CCTV",
  "Electrical",
  "Smart Home",
  "Networking",
  "Accessories",
  "Installation Services",
];

const PRODUCTS_PER_PAGE = 12;

const SITE_PAGES = [
  { title: "Home", path: "/", description: "Harry Innovative Technologies" },
  { title: "Services", path: "/services", description: "Web development, design, SEO, consulting and technology services" },
  { title: "Projects", path: "/projects", description: "Our technology projects and case studies" },
  { title: "About", path: "/about", description: "Learn about Harry Innovative Technologies" },
  { title: "Contact", path: "/contact", description: "Contact us for technology support and project enquiries" },
];

export default function Store() {
  const [products, setProducts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState(1);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  const categories = STORE_CATEGORIES;
  const filteredProducts = useMemo(() => products.filter((product) => {
    const matchesCategory = category === "All" || product.category === category;
    const searchText = `${product.name} ${product.brand} ${product.model} ${product.sku} ${product.category} ${product.subcategory} ${product.description}`.toLowerCase();
    return matchesCategory && searchText.includes(query.toLowerCase());
  }), [category, products, query]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const displayedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE,
  );
  const matchingPages = useMemo(() => {
    if (!query.trim()) return [];
    const searchText = query.toLowerCase();
    return SITE_PAGES.filter((sitePage) => `${sitePage.title} ${sitePage.description}`.toLowerCase().includes(searchText));
  }, [query]);

  useEffect(() => {
    setPage(1);
  }, [category, query]);

  useEffect(() => {
    const searchQuery = searchParams.get("search") || "";
    if (searchQuery !== query) setQuery(searchQuery);
  }, [searchParams, query]);

  const updateQuery = (value) => {
    setQuery(value);
    const nextParams = new URLSearchParams(searchParams);
    if (value.trim()) nextParams.set("search", value);
    else nextParams.delete("search");
    setSearchParams(nextParams, { replace: true });
  };

  return <main className="bg-white text-slate-950">
    <section className="relative overflow-hidden bg-slate-950 pt-32 text-white">
      <div className="absolute inset-0"><div className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-blue-600/20 blur-[140px]" /><div className="absolute bottom-0 left-0 h-[350px] w-[350px] rounded-full bg-green-500/10 blur-[120px]" /></div>
      <div className="relative mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8"><p className="mb-5 text-sm font-bold uppercase tracking-[0.25em] text-green-400">HarryInnoTech Store</p><div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end"><div className="max-w-3xl"><h1 className="text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl lg:text-8xl">Power your <span className="block bg-gradient-to-r from-green-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">next move.</span></h1><p className="mt-7 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">Explore solar, electrical, security, networking and smart-home products, then tell us what you need through WhatsApp.</p></div><Link to="/store/cart" className="inline-flex shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-bold text-white backdrop-blur transition hover:border-white/30 hover:bg-white/10">View cart <span className="ml-2">→</span></Link></div></div>
    </section>
    <section className="border-b border-slate-200 bg-white py-8"><div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 sm:px-6 lg:flex-row lg:items-center lg:px-8"><label className="relative flex-1"><span className="sr-only">Search Store</span><input type="search" value={query} onChange={(event) => updateQuery(event.target.value)} placeholder="Search products, services and solutions" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white" /></label><div className="flex gap-2 overflow-x-auto pb-1">{categories.map((item) => <button type="button" key={item} onClick={() => setCategory(item)} className={`whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-bold transition ${category === item ? "bg-slate-950 text-white" : "border border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-600"}`}>{item}</button>)}</div></div></section>
    <section className="bg-slate-50 py-16 sm:py-24"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{matchingPages.length > 0 && <div className="mb-10"><p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">Pages</p><div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{matchingPages.map((sitePage) => <Link key={sitePage.path} to={sitePage.path} className="rounded-xl border border-slate-200 bg-white p-4 transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md"><h2 className="font-black text-slate-950">{sitePage.title}</h2><p className="mt-1 text-sm leading-5 text-slate-600">{sitePage.description}</p></Link>)}</div></div>}{filteredProducts.length > 0 ? <><div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-5 lg:grid-cols-3 lg:gap-7">{displayedProducts.map((product) => <ProductCard key={product.id} product={product} />)}</div>{totalPages > 1 && <nav aria-label="Store pagination" className="mt-10 flex flex-wrap items-center justify-center gap-2"><button type="button" onClick={() => setPage((value) => Math.max(1, value - 1))} disabled={currentPage === 1} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-700 transition hover:border-blue-300 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-40">Previous</button>{Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => <button type="button" key={pageNumber} aria-label={`Go to page ${pageNumber}`} aria-current={currentPage === pageNumber ? "page" : undefined} onClick={() => setPage(pageNumber)} className={`h-10 min-w-10 rounded-lg px-3 text-sm font-bold transition ${currentPage === pageNumber ? "bg-slate-950 text-white" : "border border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:text-blue-700"}`}>{pageNumber}</button>)}<button type="button" onClick={() => setPage((value) => Math.min(totalPages, value + 1))} disabled={currentPage === totalPages} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-700 transition hover:border-blue-300 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-40">Next</button></nav>}</> : !matchingPages.length && <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center"><h2 className="text-2xl font-black">No results found</h2><p className="mt-2 text-slate-600">Try another search term.</p></div>}</div></section>
  </main>;
}
