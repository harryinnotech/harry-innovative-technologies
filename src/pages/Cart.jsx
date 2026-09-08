import { Link } from "react-router-dom";
import CartItem from "../components/store/CartItem";
import CartSummary from "../components/store/CartSummary";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { items, itemCount, total, updateQuantity, removeFromCart, clearCart } = useCart();
  return <main className="min-h-[70vh] bg-slate-50 pb-24 pt-32 text-slate-950"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">Your selection</p><h1 className="mt-3 text-4xl font-black sm:text-6xl">Shopping cart</h1></div>{items.length > 0 && <button type="button" onClick={clearCart} className="text-sm font-bold text-red-600 hover:text-red-800">Empty cart</button>}</div>{items.length === 0 ? <div className="mt-12 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center"><h2 className="text-2xl font-black">Your cart is empty</h2><p className="mt-3 text-slate-600">Browse our services and add what you need.</p><Link to="/store" className="mt-7 inline-flex rounded-xl bg-slate-950 px-5 py-3 font-bold text-white">Browse the store</Link></div> : <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_360px]"><div className="rounded-2xl bg-white px-5 shadow-sm sm:px-7">{items.map((item) => <CartItem key={item.id} item={item} onUpdateQuantity={updateQuantity} onRemove={removeFromCart} />)}</div><CartSummary itemCount={itemCount} total={total} /></div>}</div></main>;
}
