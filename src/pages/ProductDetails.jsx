import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ProductInformationSections from "../components/store/ProductInformationSections";
import RelatedProducts from "../components/store/RelatedProducts";
import { useCart } from "../context/CartContext";
import { getProductById, getProducts } from "../services/productService";
import { formatPrice } from "../utils/formatPrice";

function Gallery({ product }) {
  const images = product.images?.length ? product.images : [product.image];
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const selectedIndex = Math.max(0, images.indexOf(selectedImage));
  const showPrevious = () => setSelectedImage(images[(selectedIndex - 1 + images.length) % images.length]);
  const showNext = () => setSelectedImage(images[(selectedIndex + 1) % images.length]);

  return <div>
    <div className="relative overflow-hidden rounded-[2rem] bg-slate-100"><img src={selectedImage} alt={`${product.name} product view`} loading="eager" onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = "/products/fallback.svg"; }} className="aspect-[4/3] h-full w-full object-cover" />{images.length > 1 && <><button type="button" aria-label="Previous product image" onClick={showPrevious} className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-xl shadow">‹</button><button type="button" aria-label="Next product image" onClick={showNext} className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-xl shadow">›</button></>}</div>
    {images.length > 1 && <div className="mt-4 grid grid-cols-4 gap-3">{images.map((image, index) => <button type="button" key={image} aria-label={`View product image ${index + 1}`} onClick={() => setSelectedImage(image)} className={`overflow-hidden rounded-xl border-2 ${selectedImage === image ? "border-blue-600" : "border-transparent"}`}><img src={image} alt={`${product.name} thumbnail ${index + 1}`} loading="lazy" onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = "/products/fallback.svg"; }} className="aspect-square w-full object-cover" /></button>)}</div>}
  </div>;
}

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(undefined);
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => { getProductById(id).then(setProduct); getProducts().then(setProducts); }, [id]);

  if (product === undefined) return <main className="min-h-[70vh] bg-white px-6 pb-24 pt-40 text-center"><p className="text-slate-500">Loading product...</p></main>;
  if (!product) return <main className="min-h-[70vh] bg-white px-6 pb-24 pt-40 text-center"><p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">Store</p><h1 className="mt-4 text-4xl font-black">Product not found</h1><p className="mx-auto mt-4 max-w-md text-slate-600">This product may have been removed or the link may be incorrect.</p><Link to="/store" className="mt-8 inline-flex rounded-xl bg-slate-950 px-5 py-3 font-bold text-white">Back to store</Link></main>;
  if (!product.available) return <main className="min-h-[70vh] bg-white px-6 pb-24 pt-40 text-center"><p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">Store</p><h1 className="mt-4 text-4xl font-black">Product unavailable</h1><p className="mx-auto mt-4 max-w-md text-slate-600">This item is not currently available. Browse the Store for other options.</p><Link to="/store" className="mt-8 inline-flex rounded-xl bg-slate-950 px-5 py-3 font-bold text-white">Back to store</Link></main>;

  const handleAdd = () => { addToCart(product, quantity); navigate("/store/checkout"); };
  const displayPrice = product.priceLabel || (product.price ? formatPrice(product.price) : "Request a Quote");

  return <main className="bg-slate-50 pb-24 text-slate-950"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <Link to="/store" className="text-sm font-bold text-blue-600 hover:text-blue-800">← Back to store</Link>
    <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:items-start">
      <Gallery product={product} />
      <section className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">{product.type} · {product.category}</p>
        <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-6xl">{product.name}</h1>
        <div className="mt-5 flex flex-wrap gap-3 text-sm text-slate-600"><span>{product.brand || "Brand: Contact us to confirm"}</span><span>·</span><span>{product.model || "Model: Contact us to confirm"}</span></div>
        <p className="mt-6 text-lg leading-8 text-slate-600">{product.shortDescription || product.description}</p>
        <div className="mt-8 flex flex-wrap items-center gap-4"><span className="text-3xl font-black text-blue-700">{displayPrice}</span><span className="inline-flex items-center gap-2 text-sm font-bold text-green-700"><span className="h-2.5 w-2.5 rounded-full bg-green-500" /> Available</span></div>
        <div className="mt-8 flex items-center gap-3"><div className="flex shrink-0 items-center rounded-xl border border-slate-200"><button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))} className="h-12 w-12 text-xl hover:bg-slate-50">−</button><span className="w-10 text-center font-bold">{quantity}</span><button type="button" onClick={() => setQuantity(quantity + 1)} className="h-12 w-12 text-xl hover:bg-slate-50">+</button></div><button type="button" onClick={handleAdd} className="min-w-0 flex-1 break-words rounded-xl bg-gradient-to-r from-green-600 to-blue-600 px-6 py-3 font-bold text-white shadow-lg shadow-blue-500/15 transition hover:-translate-y-0.5">{product.quoteRequired ? "Request a quote" : "Add to cart"}</button></div>
        <p className="mt-5 text-xs text-slate-500">Image source: {product.imageSource || "Contact us to confirm"}</p>
      </section>
    </div>
    <ProductInformationSections product={product} />
    <RelatedProducts product={product} products={products} />
  </div></main>;
}
