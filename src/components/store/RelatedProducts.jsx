import { Link } from "react-router-dom";
import { formatPrice } from "../../utils/formatPrice";

export default function RelatedProducts({ product, products }) {
  const related = products.filter((candidate) => candidate.id !== product.id && (candidate.category === product.category || candidate.category === "Accessories")).slice(0, 4);
  if (!related.length) return null;

  return <section className="mt-16"><div className="mb-6 flex items-end justify-between gap-4"><div><p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">Continue exploring</p><h2 className="mt-2 text-3xl font-black tracking-tight">Related products</h2></div><Link to="/store" className="text-sm font-bold text-blue-600 hover:text-blue-800">View all</Link></div><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{related.map((item) => <Link key={item.id} to={`/store/${item.id}`} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"><img src={item.image} alt={item.name} loading="lazy" onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = "/products/fallback.svg"; }} className="aspect-[4/3] w-full object-cover" /><div className="p-4"><p className="font-bold text-slate-950">{item.name}</p><p className="mt-2 text-sm font-black text-blue-700">{item.priceLabel || (item.price ? formatPrice(item.price) : "Request a Quote")}</p></div></Link>)}</div></section>;
}
