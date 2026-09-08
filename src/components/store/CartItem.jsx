import { formatPrice } from "../../utils/formatPrice";

export default function CartItem({ item, onUpdateQuantity, onRemove }) {
  return (
    <div className="flex gap-4 border-b border-slate-200 py-5 last:border-0">
      <img src={item.image} alt="" className="h-20 w-20 rounded-xl object-cover" />
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3"><h2 className="font-bold text-slate-950">{item.name}</h2><button type="button" onClick={() => onRemove(item.id)} className="text-sm font-bold text-slate-400 hover:text-red-600">Remove</button></div>
        <p className="mt-1 text-sm text-slate-500">{item.priceLabel || formatPrice(item.price)}{!item.quoteRequired && " each"}</p>
        <div className="mt-3 flex items-center justify-between"><div className="flex items-center overflow-hidden rounded-lg border border-slate-200"><button type="button" onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} className="h-8 w-8 text-lg text-slate-700 hover:bg-slate-100">−</button><span className="w-8 text-center text-sm font-bold">{item.quantity}</span><button type="button" onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="h-8 w-8 text-lg text-slate-700 hover:bg-slate-100">+</button></div><strong className="text-right text-slate-950">{item.quoteRequired ? "Quote requested" : formatPrice(item.price * item.quantity)}</strong></div>
      </div>
    </div>
  );
}
