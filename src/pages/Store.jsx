import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import ProductCard from "../components/store/ProductCard";
import { FilterSidebar, MobileFilterDrawer } from "../components/store/StoreFilters";
import { getProducts } from "../services/productService";
import { formatPrice } from "../utils/formatPrice";

const PRODUCTS_PER_PAGE = 12;
const SORT_OPTIONS = {
  all: [["recommended", "Recommended"], ["price-low", "Price: Low to High"], ["price-high", "Price: High to Low"]],
  products: [["recommended", "Recommended"], ["price-low", "Price: Low to High"], ["price-high", "Price: High to Low"]],
  services: [["recommended", "Recommended"], ["price-low", "Lowest price"], ["price-high", "Highest price"]],
};
const SITE_PAGES = [
  { title: "Home", path: "/", description: "Harry Innovative Technologies" },
  { title: "Services", path: "/services", description: "Web development, design, SEO, consulting and technology services" },
  { title: "Projects", path: "/projects", description: "Our technology projects and case studies" },
  { title: "About", path: "/about", description: "Learn about Harry Innovative Technologies" },
  { title: "Contact", path: "/contact", description: "Contact us for technology support and project enquiries" },
];

const emptyFilters = () => ({ categories: [], brands: [], availability: [], pricing: [], minPrice: "", maxPrice: "" });
const splitParam = (params, key) => params.get(key)?.split(",").filter(Boolean) || [];
const readState = (params) => ({
  type: ["products", "services", "all"].includes(params.get("type")) ? params.get("type") : "all",
  query: params.get("search") || "",
  sort: params.get("sort") || "recommended",
  filters: { categories: splitParam(params, "category"), brands: splitParam(params, "brand"), availability: splitParam(params, "availability"), pricing: splitParam(params, "pricing"), minPrice: params.get("minPrice") || "", maxPrice: params.get("maxPrice") || "" },
});

function getSearchText(item) {
  return Object.values(item).filter((value) => typeof value === "string").join(" ").toLowerCase();
}

function matchesItem(item, type, query, filters, excluded = "") {
  if (type !== "all" && item.type !== (type === "services" ? "SERVICE" : "PRODUCT")) return false;
  if (query.trim() && !getSearchText(item).includes(query.trim().toLowerCase())) return false;
  if (excluded !== "categories" && filters.categories.length && !filters.categories.includes(item.category)) return false;
  if (excluded !== "brands" && filters.brands.length && !filters.brands.includes(item.brand)) return false;
  if (excluded !== "availability" && filters.availability.length && !filters.availability.includes(item.available ? "available" : "unavailable")) return false;
  if (excluded !== "pricing" && filters.pricing.length && !filters.pricing.includes(item.quoteRequired ? "quote" : "fixed")) return false;
  const price = Number(item.price);
  if (excluded !== "price" && filters.minPrice && (!Number.isFinite(price) || price < Number(filters.minPrice))) return false;
  if (excluded !== "price" && filters.maxPrice && (!Number.isFinite(price) || price > Number(filters.maxPrice))) return false;
  return true;
}

function sortItems(items, sort) {
  return [...items].sort((left, right) => {
    if (sort === "price-low") return (left.price ?? Number.POSITIVE_INFINITY) - (right.price ?? Number.POSITIVE_INFINITY);
    if (sort === "price-high") return (right.price ?? 0) - (left.price ?? 0);
    return left.name.localeCompare(right.name);
  });
}

function uniqueOptions(items, label, value) {
  return [...new Set(items.map(value).filter(Boolean))].sort().map((option) => ({ value: option, label: label(option), count: items.filter((item) => value(item) === option).length }));
}

function getFilterOptions(items, type, query, filters) {
  const typedItems = items.filter((item) => type === "all" || item.type === (type === "services" ? "SERVICE" : "PRODUCT"));
  const scopedItems = typedItems.filter((item) => !query.trim() || getSearchText(item).includes(query.trim().toLowerCase()));
  const categories = uniqueOptions(scopedItems, (option) => option, (item) => item.category).map((option) => ({ ...option, count: scopedItems.filter((item) => matchesItem(item, type, query, filters, "categories") && item.category === option.value).length }));
  const brands = uniqueOptions(scopedItems, (option) => option, (item) => item.brand).map((option) => ({ ...option, count: scopedItems.filter((item) => matchesItem(item, type, query, filters, "brands") && item.brand === option.value).length }));
  const availabilityValues = [...new Set(scopedItems.map((item) => item.available ? "available" : "unavailable"))];
  const pricingValues = [...new Set(scopedItems.map((item) => item.quoteRequired ? "quote" : "fixed"))];
  const availability = availabilityValues.map((value) => ({ value, label: value === "available" ? "Available" : "Unavailable", count: scopedItems.filter((item) => matchesItem(item, type, query, filters, "availability") && (item.available ? "available" : "unavailable") === value).length }));
  const pricing = pricingValues.map((value) => ({ value, label: value === "quote" ? "Request a quote" : "Fixed price", count: scopedItems.filter((item) => matchesItem(item, type, query, filters, "pricing") && (item.quoteRequired ? "quote" : "fixed") === value).length }));
  const prices = typedItems.map((item) => item.price).filter((price) => Number.isFinite(price));
  return { categories, brands, availability, pricing, priceBounds: prices.length ? { min: Math.min(...prices), max: Math.max(...prices) } : null };
}

function writeState(setSearchParams, type, query, sort, filters) {
  const next = new URLSearchParams();
  if (type !== "all") next.set("type", type);
  if (query.trim()) next.set("search", query.trim());
  if (sort !== "recommended") next.set("sort", sort);
  if (filters.categories.length) next.set("category", filters.categories.join(","));
  if (filters.brands.length) next.set("brand", filters.brands.join(","));
  if (filters.availability.length) next.set("availability", filters.availability.join(","));
  if (filters.pricing.length) next.set("pricing", filters.pricing.join(","));
  if (filters.minPrice) next.set("minPrice", filters.minPrice);
  if (filters.maxPrice) next.set("maxPrice", filters.maxPrice);
  setSearchParams(next, { replace: true });
}

export default function Store() {
  const [products, setProducts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const initial = readState(searchParams);
  const [type, setType] = useState(initial.type);
  const [query, setQuery] = useState(initial.query);
  const [sort, setSort] = useState(initial.sort);
  const [filters, setFilters] = useState(initial.filters);
  const [page, setPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const filterButtonRef = useRef(null);

  useEffect(() => { getProducts().then(setProducts); }, []);
  useEffect(() => { const next = readState(searchParams); setType(next.type); setQuery(next.query); setSort(next.sort); setFilters(next.filters); }, [searchParams]);

  const filteredProducts = useMemo(() => sortItems(products.filter((item) => matchesItem(item, type, query, filters)), sort), [filters, products, query, sort, type]);
  const filterOptions = useMemo(() => getFilterOptions(products, type, query, filters), [filters, products, query, type]);
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const displayedProducts = filteredProducts.slice((currentPage - 1) * PRODUCTS_PER_PAGE, currentPage * PRODUCTS_PER_PAGE);
  const matchingPages = useMemo(() => !query.trim() ? [] : SITE_PAGES.filter((sitePage) => `${sitePage.title} ${sitePage.description}`.toLowerCase().includes(query.toLowerCase())), [query]);
  const activeFilters = [...filters.categories.map((value) => ({ key: "categories", value, label: `Category: ${value}` })), ...filters.brands.map((value) => ({ key: "brands", value, label: `Brand: ${value}` })), ...filters.availability.map((value) => ({ key: "availability", value, label: `Availability: ${value === "available" ? "Available" : "Unavailable"}` })), ...filters.pricing.map((value) => ({ key: "pricing", value, label: `Pricing: ${value === "quote" ? "Request a quote" : "Fixed price"}` })), ...(filters.minPrice ? [{ key: "minPrice", value: filters.minPrice, label: `From ${formatPrice(Number(filters.minPrice))}` }] : []), ...(filters.maxPrice ? [{ key: "maxPrice", value: filters.maxPrice, label: `Up to ${formatPrice(Number(filters.maxPrice))}` }] : [])];

  useEffect(() => { setPage(1); }, [filters, query, sort, type]);
  const update = (nextFilters = filters, nextType = type, nextQuery = query, nextSort = sort) => { setFilters(nextFilters); setType(nextType); setQuery(nextQuery); setSort(nextSort); writeState(setSearchParams, nextType, nextQuery, nextSort, nextFilters); };
  const toggleFilter = (key, value) => update({ ...filters, [key]: filters[key].includes(value) ? filters[key].filter((item) => item !== value) : [...filters[key], value] });
  const updatePrice = (key, value) => update({ ...filters, [key]: value });
  const clearAll = () => update(emptyFilters());
  const changeType = (nextType) => update({ ...filters, categories: [] }, nextType, query, "recommended");
  const removeChip = (chip) => chip.key === "minPrice" || chip.key === "maxPrice" ? update({ ...filters, [chip.key]: "" }) : toggleFilter(chip.key, chip.value);
  const updateQuery = (value) => update(filters, type, value, sort);
  const changeSort = (value) => update(filters, type, query, value);

  return <main className="bg-white text-slate-950">
    <section className="relative overflow-hidden bg-slate-950 pt-32 text-white"><div className="absolute inset-0"><div className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-blue-600/20 blur-[140px]" /><div className="absolute bottom-0 left-0 h-[350px] w-[350px] rounded-full bg-green-500/10 blur-[120px]" /></div><div className="relative mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8"><p className="mb-5 text-sm font-bold uppercase tracking-[0.25em] text-green-400">HarryInnoTech Store</p><div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end"><div className="max-w-3xl"><h1 className="text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl lg:text-8xl">Power your <span className="block bg-gradient-to-r from-green-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">next move.</span></h1><p className="mt-7 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">Explore products and services, then tell us what you need through WhatsApp.</p></div><Link to="/store/cart" className="inline-flex shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-bold text-white backdrop-blur transition hover:border-white/30 hover:bg-white/10">View cart <span className="ml-2">→</span></Link></div></div></section>
    <section className="border-b border-slate-200 bg-white py-8"><div className="mx-auto max-w-7xl space-y-5 px-4 sm:px-6 lg:px-8"><div className="flex flex-col gap-4 lg:flex-row lg:items-center"><label className="relative flex-1"><span className="sr-only">Search store</span><input type="search" value={query} onChange={(event) => updateQuery(event.target.value)} placeholder="Search products, services and solutions" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white" /></label><div className="flex rounded-xl border border-slate-200 bg-slate-50 p-1"><button type="button" aria-pressed={type === "all"} onClick={() => changeType("all")} className={`rounded-lg px-4 py-2 text-sm font-black ${type === "all" ? "bg-white text-slate-950 shadow-sm" : "text-slate-500"}`}>All</button><button type="button" aria-pressed={type === "products"} onClick={() => changeType("products")} className={`rounded-lg px-4 py-2 text-sm font-black ${type === "products" ? "bg-white text-slate-950 shadow-sm" : "text-slate-500"}`}>Products</button><button type="button" aria-pressed={type === "services"} onClick={() => changeType("services")} className={`rounded-lg px-4 py-2 text-sm font-black ${type === "services" ? "bg-white text-slate-950 shadow-sm" : "text-slate-500"}`}>Services</button></div></div><div className="flex flex-wrap gap-2"><button ref={filterButtonRef} type="button" onClick={() => setMobileFiltersOpen(true)} className="rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-black text-white lg:hidden">Filter</button><label className="flex items-center rounded-xl border border-slate-200 px-3 text-sm font-bold text-slate-600">Sort<select value={sort} onChange={(event) => changeSort(event.target.value)} className="ml-2 bg-transparent py-2 outline-none">{SORT_OPTIONS[type].map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label></div></div></section>
    <section className="bg-slate-50 py-10 sm:py-16"><div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[260px_1fr] lg:px-8"><FilterSidebar filterOptions={filterOptions} filters={filters} onToggle={toggleFilter} onPriceChange={updatePrice} onClear={clearAll} resultCount={filteredProducts.length} /><div className="min-w-0"><div className="mb-6 flex flex-wrap items-center justify-between gap-3"><div><p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">{type === "products" ? "Products" : "Services"}</p><h2 className="mt-2 text-3xl font-black">{filteredProducts.length} results</h2></div>{activeFilters.length > 0 && <button type="button" onClick={clearAll} className="text-sm font-bold text-blue-700 hover:text-blue-900">Clear all</button>}</div>{activeFilters.length > 0 && <div className="mb-6 flex flex-wrap gap-2">{activeFilters.map((chip) => <button type="button" key={`${chip.key}-${chip.value}`} onClick={() => removeChip(chip)} className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-800">{chip.label} ×</button>)}</div>}{matchingPages.length > 0 && <div className="mb-10"><p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">Pages</p><div className="mt-4 grid gap-3 sm:grid-cols-2">{matchingPages.map((sitePage) => <Link key={sitePage.path} to={sitePage.path} className="rounded-xl border border-slate-200 bg-white p-4 transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md"><h2 className="font-black text-slate-950">{sitePage.title}</h2><p className="mt-1 text-sm leading-5 text-slate-600">{sitePage.description}</p></Link>)}</div></div>}{filteredProducts.length > 0 ? <><div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-5 lg:grid-cols-3 lg:gap-7">{displayedProducts.map((product) => <ProductCard key={product.id} product={product} />)}</div>{totalPages > 1 && <nav aria-label="Store pagination" className="mt-10 flex flex-wrap items-center justify-center gap-2"><button type="button" onClick={() => setPage((value) => Math.max(1, value - 1))} disabled={currentPage === 1} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-700 transition hover:border-blue-300 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-40">Previous</button>{Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => <button type="button" key={pageNumber} aria-label={`Go to page ${pageNumber}`} aria-current={currentPage === pageNumber ? "page" : undefined} onClick={() => setPage(pageNumber)} className={`h-10 min-w-10 rounded-lg px-3 text-sm font-bold transition ${currentPage === pageNumber ? "bg-slate-950 text-white" : "border border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:text-blue-700"}`}>{pageNumber}</button>)}<button type="button" onClick={() => setPage((value) => Math.min(totalPages, value + 1))} disabled={currentPage === totalPages} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-700 transition hover:border-blue-300 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-40">Next</button></nav>}</> : <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center"><h2 className="text-2xl font-black">No {type} found</h2><p className="mt-2 text-slate-600">Try removing some filters or changing your search.</p><button type="button" onClick={clearAll} className="mt-6 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white">Clear all filters</button></div>}</div></div></section>
    <MobileFilterDrawer open={mobileFiltersOpen} onClose={() => setMobileFiltersOpen(false)} returnFocusRef={filterButtonRef} filterOptions={filterOptions} filters={filters} onApply={(draft) => update(draft)} previewResultCount={filteredProducts.length} getResultCount={(draft) => products.filter((item) => matchesItem(item, type, query, draft)).length} />
  </main>;
}
