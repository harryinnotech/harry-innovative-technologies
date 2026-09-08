import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
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

export default function Store() {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  const categories = STORE_CATEGORIES;
  const filteredProducts = useMemo(() => products.filter((product) => {
    const matchesCategory = category === "All" || product.category === category;
    const searchText = `${product.name} ${product.brand} ${product.model} ${product.sku} ${product.category} ${product.subcategory} ${product.description}`.toLowerCase();
    return matchesCategory && searchText.includes(query.toLowerCase());
  }), [category, products, query]);

  return <main className="bg-white text-slate-950">
    <section className="relative overflow-hidden bg-slate-950 pt-32 text-white">
      <div className="absolute inset-0"><div className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-blue-600/20 blur-[140px]" /><div className="absolute bottom-0 left-0 h-[350px] w-[350px] rounded-full bg-green-500/10 blur-[120px]" /></div>
      <div className="relative mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8"><p className="mb-5 text-sm font-bold uppercase tracking-[0.25em] text-green-400">HarryInnoTech Store</p><div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end"><div className="max-w-3xl"><h1 className="text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl lg:text-8xl">Power your <span className="block bg-gradient-to-r from-green-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">next move.</span></h1><p className="mt-7 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">Explore solar, electrical, security, networking and smart-home products, then tell us what you need through WhatsApp.</p></div><Link to="/store/cart" className="inline-flex shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-bold text-white backdrop-blur transition hover:border-white/30 hover:bg-white/10">View cart <span className="ml-2">→</span></Link></div></div>
    </section>
    <section className="border-b border-slate-200 bg-white py-8"><div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 sm:px-6 lg:flex-row lg:items-center lg:px-8"><label className="relative flex-1"><span className="sr-only">Search Store</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search products, services and solutions" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white" /></label><div className="flex gap-2 overflow-x-auto pb-1">{categories.map((item) => <button type="button" key={item} onClick={() => setCategory(item)} className={`whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-bold transition ${category === item ? "bg-slate-950 text-white" : "border border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-600"}`}>{item}</button>)}</div></div></section>
    <section className="bg-slate-50 py-16 sm:py-24"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{filteredProducts.length > 0 ? <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">{filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)}</div> : <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center"><h2 className="text-2xl font-black">No products found</h2><p className="mt-2 text-slate-600">Try another search or category.</p></div>}</div></section>
  </main>;
}
