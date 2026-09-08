import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { formatPrice } from "../../utils/formatPrice";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <article className="group relative overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-sm transition duration-500 hover:-translate-y-1 hover:shadow-2xl">
      <Link to={`/store/${product.id}`} aria-label={`View ${product.name}`} className="absolute inset-0 z-0" />
      <div className="pointer-events-none relative z-10">
        <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
          <img src={product.image} alt={product.name} loading="lazy" onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = "/products/fallback.svg"; }} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
          <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-slate-900 backdrop-blur">{product.category}</span>
        </div>
        <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-xl font-black tracking-tight text-slate-950">{product.name}</h2>
          <span className="shrink-0 text-right text-lg font-black text-blue-700">{product.priceLabel || formatPrice(product.price)}</span>
        </div>
        <p className="mt-3 min-h-12 text-sm leading-6 text-slate-600">{product.description}</p>
        <div className="mt-5 flex items-center justify-between gap-3">
          <span className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider ${product.available ? "text-green-700" : "text-slate-500"}`}><span className={`h-2 w-2 rounded-full ${product.available ? "bg-green-500" : "bg-slate-400"}`} /> {product.available ? "Available" : "Unavailable"}</span>
          <button type="button" disabled={!product.available} onClick={() => addToCart(product)} className="pointer-events-auto rounded-xl bg-slate-950 px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300">{product.available ? (product.quoteRequired ? "Request quote" : "Add to cart") : "Unavailable"}</button>
        </div>
        </div>
      </div>
    </article>
  );
}
