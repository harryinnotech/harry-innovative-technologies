import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { formatPrice } from "../../utils/formatPrice";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <article className="group relative flex h-[220px] min-w-0 overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-sm transition duration-500 hover:-translate-y-1 hover:shadow-2xl sm:h-auto sm:block">
      <Link to={`/store/${product.id}`} aria-label={`View ${product.name}`} className="absolute inset-0 z-0" />
      <div className="pointer-events-none relative z-10 flex h-full min-w-0 w-full sm:block sm:h-auto">
        <div className="relative h-full w-[38%] shrink-0 overflow-hidden bg-slate-100 sm:aspect-[16/10] sm:h-auto sm:w-full">
          <img src={product.image} alt={product.name} loading="lazy" onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = "/products/fallback.svg"; }} className="h-full w-full object-contain transition duration-700 group-hover:scale-105" />
          <span className="absolute left-2 top-2 max-w-[calc(100%-1rem)] truncate rounded-full bg-white/90 px-2 py-1 text-[10px] font-bold text-slate-900 backdrop-blur sm:left-4 sm:top-4 sm:px-3 sm:py-1.5 sm:text-xs">{product.category}</span>
        </div>
        <div className="min-w-0 flex-1 p-3 sm:p-6">
        <div className="min-w-0">
          <div className="sm:flex sm:items-start sm:justify-between sm:gap-4">
            <h2 className="break-words text-sm font-black tracking-tight text-slate-950 sm:text-xl">{product.name}</h2>
            <span className="mt-1 block break-words text-xs font-black text-blue-700 sm:mt-0 sm:shrink-0 sm:text-right sm:text-lg">{product.priceLabel || formatPrice(product.price)}</span>
          </div>
        </div>
        <p className="mt-2 line-clamp-3 text-xs leading-5 text-slate-600 sm:mt-3 sm:text-sm sm:leading-6 sm:line-clamp-none">{product.description}</p>
        <div className="mt-3 flex min-w-0 flex-col items-start gap-2 sm:mt-5 sm:flex-row sm:items-center sm:justify-between">
          <span className={`inline-flex min-w-0 items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide sm:gap-2 sm:text-xs sm:tracking-wider ${product.available ? "text-green-700" : "text-slate-500"}`}><span className={`h-2 w-2 shrink-0 rounded-full ${product.available ? "bg-green-500" : "bg-slate-400"}`} /> <span className="truncate">{product.available ? "Available" : "Unavailable"}</span></span>
          <button type="button" disabled={!product.available} onClick={() => addToCart(product)} className="pointer-events-auto max-w-full rounded-lg bg-slate-950 px-2.5 py-2 text-[11px] font-bold leading-tight text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300 sm:rounded-xl sm:px-4 sm:py-3 sm:text-sm">{product.available ? (product.quoteRequired ? "Request quote" : "Add to cart") : "Unavailable"}</button>
        </div>
        </div>
      </div>
    </article>
  );
}
