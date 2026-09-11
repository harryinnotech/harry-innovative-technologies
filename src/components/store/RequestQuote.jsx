import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { buildWhatsAppQuoteMessage, createQuoteRequest, getWhatsAppUrl } from "../../services/quoteRequestService";

const emptyForm = { name: "", phone: "", email: "", budget: "", location: "", preferredDate: "", preferredTime: "", message: "", serviceDetails: {} };

function validate(form, listingType, quantity) {
  const errors = {};
  if (!form.name.trim()) errors.name = "Enter your name.";
  if (!form.phone.trim()) errors.phone = "Enter your phone number.";
  if (form.email.trim() && !/^\S+@\S+\.\S+$/.test(form.email.trim())) errors.email = "Enter a valid email address.";
  if (listingType === "PRODUCT" && (!Number.isInteger(quantity) || quantity < 1)) errors.quantity = "Quantity must be greater than zero.";
  if (listingType === "SERVICE" && !form.message.trim()) errors.message = "Tell the provider what you need.";
  return errors;
}

function Field({ label, name, value, onChange, error, required = false, type = "text", placeholder, compact = false, ...props }) {
  return <label className="block text-sm font-bold text-slate-800"><span>{label}{required && <span className="text-red-600"> *</span>}</span><input {...props} name={name} type={type} value={value} onChange={onChange} placeholder={placeholder} aria-invalid={Boolean(error)} aria-describedby={error ? `${name}-error` : undefined} className={`mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 font-normal outline-none transition focus:border-blue-500 focus:bg-white ${compact ? "h-10 py-2 text-sm" : "py-3"}`} />{error && <span id={`${name}-error`} className="mt-1 block text-xs font-semibold text-red-600">{error}</span>}</label>;
}

function ListingSummary({ listing, listingType }) {
  return <div className="flex gap-4 rounded-xl bg-slate-50 p-3"><img src={listing.image} alt="" className="h-20 w-20 rounded-lg object-cover" /><div className="min-w-0"><p className="text-xs font-bold uppercase tracking-[0.15em] text-blue-600">{listingType === "PRODUCT" ? "Product" : "Service"}</p><h3 className="mt-1 font-black text-slate-950">{listing.name}</h3><p className="mt-1 text-sm text-slate-600">{listing.providerName || "Harry Innovative Technologies"}</p></div></div>;
}

export function RequestQuoteButton({ listing, listingType = listing?.type, quantity = 1, selectedOptions = {}, className = "" }) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef(null);
  const close = () => { setOpen(false); buttonRef.current?.focus(); };
  return <><button ref={buttonRef} type="button" onClick={() => setOpen(true)} className={`rounded-xl bg-green-600 px-5 py-3 font-bold text-white transition hover:-translate-y-0.5 hover:bg-green-700 ${className}`}>Request a Quote</button>{open && createPortal(<RequestQuoteModal listing={listing} listingType={listingType} initialQuantity={quantity} initialOptions={selectedOptions} onClose={close} />, document.body)}</>;
}

export function RequestQuoteModal({ listing, listingType, initialQuantity = 1, initialOptions = {}, onClose }) {
  const [form, setForm] = useState(emptyForm);
  const [quantity, setQuantity] = useState(initialQuantity);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("form");
  const [request, setRequest] = useState(null);
  const [message, setMessage] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [copied, setCopied] = useState(false);
  const dialogRef = useRef(null);

  useEffect(() => {
    const onKeyDown = (event) => { if (event.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKeyDown);
    dialogRef.current?.focus();
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const updateField = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  const submit = async (event) => {
    event.preventDefault();
    const nextErrors = validate(form, listingType, quantity);
    setErrors(nextErrors);
    setSubmitError("");
    if (Object.keys(nextErrors).length) return;
    setStatus("submitting");
    try {
      const created = await createQuoteRequest({ listing, listingType, form, quantity, selectedOptions: initialOptions });
      const whatsappMessage = buildWhatsAppQuoteMessage({ request: created });
      setRequest(created);
      setMessage(whatsappMessage);
      setStatus("success");
    } catch {
      setSubmitError("Unable to create your quote request. Please try again.");
      setStatus("form");
    }
  };
  const openWhatsApp = () => { const url = request && getWhatsAppUrl(request, message); if (url) window.open(url, "_blank", "noopener,noreferrer"); };
  const copyMessage = async () => { try { await navigator.clipboard.writeText(message); setCopied(true); } catch { setCopied(false); } };

  return <div className="fixed inset-0 z-[100] flex items-end justify-center bg-slate-950/60 p-0 backdrop-blur-sm sm:items-center sm:p-5" role="presentation"><div ref={dialogRef} tabIndex="-1" role="dialog" aria-modal="true" aria-labelledby="quote-dialog-title" className="max-h-[95vh] w-full overflow-y-auto rounded-t-3xl bg-white p-5 outline-none sm:max-w-2xl sm:rounded-2xl sm:p-7"><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">WhatsApp quote request</p><h2 id="quote-dialog-title" className="mt-2 text-2xl font-black text-slate-950">Request a Quote</h2></div><button type="button" onClick={onClose} aria-label="Close quote request" className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-xl text-slate-600 hover:border-slate-400">×</button></div>
    <div className="mt-5"><ListingSummary listing={listing} listingType={listingType} /></div>
    {status === "success" ? <div className="mt-6 rounded-2xl bg-green-50 p-5"><p className="text-lg font-black text-green-800">✓ Quote request created</p><p className="mt-2 text-sm text-green-900">We have prepared your request for WhatsApp.</p><p className="mt-4 font-black text-slate-950">Quote Request: #{request.id}</p><div className="mt-5 flex flex-wrap gap-3"><button type="button" onClick={openWhatsApp} className="rounded-xl bg-green-600 px-5 py-3 font-bold text-white hover:bg-green-700">Continue to WhatsApp</button><button type="button" onClick={copyMessage} className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-bold text-slate-800 hover:border-slate-500">{copied ? "Message copied" : "Copy Message"}</button><button type="button" onClick={onClose} className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-bold text-slate-800 hover:border-slate-500">Close</button></div>{!request.providerWhatsApp && <p className="mt-4 text-sm font-semibold text-red-700">WhatsApp is not available for this seller.</p>}</div> : <form onSubmit={submit} className="mt-6 space-y-5" noValidate>
      {listingType === "PRODUCT" && <div><label className="block text-sm font-bold text-slate-800">Quantity <span className="text-red-600">*</span></label><div className="mt-2 flex w-fit items-center overflow-hidden rounded-xl border border-slate-200"><button type="button" aria-label="Decrease quantity" onClick={() => setQuantity((value) => Math.max(1, value - 1))} className="h-11 w-11 text-xl hover:bg-slate-50">−</button><span className="w-12 text-center font-bold">{quantity}</span><button type="button" aria-label="Increase quantity" onClick={() => setQuantity((value) => value + 1)} className="h-11 w-11 text-xl hover:bg-slate-50">+</button></div>{errors.quantity && <p className="mt-1 text-xs font-semibold text-red-600">{errors.quantity}</p>}</div>}
      <div className="grid gap-4 sm:grid-cols-2"><Field label="Name" name="name" value={form.name} onChange={updateField} error={errors.name} required placeholder="Your name" /><Field label="Phone" name="phone" type="tel" value={form.phone} onChange={updateField} error={errors.phone} required placeholder="WhatsApp phone number" /></div>
      <div><Field label="Email" name="email" type="email" value={form.email} onChange={updateField} error={errors.email} placeholder="you@example.com" /></div>
      {listingType === "SERVICE" && <div className="grid gap-4 sm:grid-cols-2"><Field label="Location" name="location" value={form.location} onChange={updateField} placeholder="Optional" /><Field label="Preferred date" name="preferredDate" type="date" value={form.preferredDate} onChange={updateField} compact /><Field label="Preferred time" name="preferredTime" type="time" value={form.preferredTime} onChange={updateField} compact /></div>}
      {listingType === "PRODUCT" && <div className="grid gap-4 sm:grid-cols-2"><Field label="Delivery location" name="location" value={form.location} onChange={updateField} placeholder="Optional" /><Field label="Target budget" name="budget" value={form.budget} onChange={updateField} placeholder="Optional" /></div>}
      {listingType === "SERVICE" && <Field label="Budget" name="budget" value={form.budget} onChange={updateField} placeholder="Optional" />}
      <label className="block text-sm font-bold text-slate-800">{listingType === "PRODUCT" ? "Additional requirements" : "Requirements / project description"}{listingType === "SERVICE" && <span className="text-red-600"> *</span>}<textarea name="message" value={form.message} onChange={updateField} rows="4" placeholder={listingType === "SERVICE" ? "Tell the provider what you need" : "Anything the seller should know?"} aria-invalid={Boolean(errors.message)} className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 font-normal outline-none transition focus:border-blue-500 focus:bg-white" />{errors.message && <span className="mt-1 block text-xs font-semibold text-red-600">{errors.message}</span>}</label>
      {submitError && <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{submitError}</p>}<button type="submit" disabled={status === "submitting"} className="w-full rounded-xl bg-green-600 px-5 py-4 font-black text-white transition hover:bg-green-700 disabled:cursor-wait disabled:opacity-60">{status === "submitting" ? "Creating request..." : "Send Quote Request"}</button><p className="text-center text-xs leading-5 text-slate-500">Your request will be saved, then prepared for WhatsApp.</p>
    </form>}
  </div></div>;
}