import { Link } from "react-router-dom";
import { formatPrice } from "../../utils/formatPrice";

export default function CartSummary({ itemCount, total, checkout = true }) {
  return <div className="rounded-2xl bg-slate-950 p-6 text-white shadow-xl"><div className="flex justify-between text-sm text-slate-300"><span>Items</span><span>{itemCount}</span></div><div className="mt-4 flex justify-between border-t border-white/10 pt-4 text-lg font-black"><span>Product total</span><span>{formatPrice(total)}</span></div><p className="mt-3 text-xs leading-5 text-slate-400">Quote-based services are confirmed and priced manually on WhatsApp.</p>{checkout && <Link to="/store/checkout" className="mt-6 flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-green-500 to-blue-600 px-5 py-4 text-sm font-bold text-white transition hover:-translate-y-0.5">Continue to checkout</Link>}</div>;
}
