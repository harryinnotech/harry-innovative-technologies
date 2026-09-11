import { useEffect, useRef, useState } from "react";
import { formatPrice } from "../../utils/formatPrice";

function FilterGroup({ label, options, values, onToggle }) {
  if (!options.length) return null;

  return (
    <details open className="border-b border-slate-200 pb-5 last:border-0 last:pb-0">
      <summary className="cursor-pointer list-none text-sm font-black text-slate-950 focus:outline-none focus:ring-2 focus:ring-blue-500">{label}</summary>
      <div className="mt-3 space-y-2" role="group" aria-label={label}>
        {options.map((option) => (
          <label key={option.value} className="flex cursor-pointer items-center justify-between gap-3 text-sm text-slate-700">
            <span className="flex min-w-0 items-center gap-2">
              <input type="checkbox" checked={values.includes(option.value)} onChange={() => onToggle(option.value)} className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
              <span className="truncate">{option.label}</span>
            </span>
            <span className="shrink-0 text-xs text-slate-400">{option.count}</span>
          </label>
        ))}
      </div>
    </details>
  );
}

function PriceFilter({ filters, onPriceChange, bounds }) {
  if (!bounds) return null;

  return (
    <details open className="border-b border-slate-200 pb-5">
      <summary className="cursor-pointer list-none text-sm font-black text-slate-950 focus:outline-none focus:ring-2 focus:ring-blue-500">Price range</summary>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <label className="text-xs font-bold text-slate-500">Minimum<input type="number" min="0" placeholder={String(bounds.min)} value={filters.minPrice} onChange={(event) => onPriceChange("minPrice", event.target.value)} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-normal text-slate-900 outline-none focus:border-blue-500" /></label>
        <label className="text-xs font-bold text-slate-500">Maximum<input type="number" min="0" placeholder={String(bounds.max)} value={filters.maxPrice} onChange={(event) => onPriceChange("maxPrice", event.target.value)} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-normal text-slate-900 outline-none focus:border-blue-500" /></label>
      </div>
      <p className="mt-2 text-xs text-slate-500">{formatPrice(bounds.min)} to {formatPrice(bounds.max)}</p>
    </details>
  );
}

export function FilterPanel({ filterOptions, filters, onToggle, onPriceChange, onClear, resultCount, onApply, closeLabel }) {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div><p className="text-sm font-black text-slate-950">Filters</p><p className="mt-1 text-xs text-slate-500">{resultCount} matching results</p></div>
        <button type="button" onClick={onClear} className="text-xs font-bold text-blue-700 hover:text-blue-900">Clear all</button>
      </div>
      <FilterGroup label="Category" options={filterOptions.categories} values={filters.categories} onToggle={(value) => onToggle("categories", value)} />
      <FilterGroup label="Brand" options={filterOptions.brands} values={filters.brands} onToggle={(value) => onToggle("brands", value)} />
      <FilterGroup label="Availability" options={filterOptions.availability} values={filters.availability} onToggle={(value) => onToggle("availability", value)} />
      <FilterGroup label="Pricing" options={filterOptions.pricing} values={filters.pricing} onToggle={(value) => onToggle("pricing", value)} />
      <PriceFilter filters={filters} onPriceChange={onPriceChange} bounds={filterOptions.priceBounds} />
      {onApply && <button type="button" onClick={onApply} className="sticky bottom-0 w-full rounded-xl bg-slate-950 px-4 py-3 text-sm font-black text-white shadow-lg">{closeLabel || `Show ${resultCount} results`}</button>}
    </div>
  );
}

export function FilterSidebar(props) {
  return <aside className="hidden h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:sticky lg:top-24 lg:block"><FilterPanel {...props} /></aside>;
}

export function MobileFilterDrawer({ open, onClose, ...props }) {
  const closeButtonRef = useRef(null);
  const wasOpenRef = useRef(false);
  const [draft, setDraft] = useState(props.filters);

  useEffect(() => {
    if (open) {
      setDraft(props.filters);
      closeButtonRef.current?.focus();
      document.body.style.overflow = "hidden";
    } else if (wasOpenRef.current) {
      props.returnFocusRef?.current?.focus();
      document.body.style.overflow = "";
    }
    wasOpenRef.current = open;
    return () => { document.body.style.overflow = ""; };
  }, [open, props.filters, props.returnFocusRef]);

  useEffect(() => {
    if (!open) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const toggleDraft = (key, value) => {
    setDraft((current) => ({ ...current, [key]: current[key].includes(value) ? current[key].filter((item) => item !== value) : [...current[key], value] }));
  };
  const changeDraftPrice = (key, value) => setDraft((current) => ({ ...current, [key]: value }));
  const clearDraft = () => setDraft({ categories: [], brands: [], availability: [], pricing: [], minPrice: "", maxPrice: "" });
  const previewCount = props.getResultCount ? props.getResultCount(draft) : props.previewResultCount;

  return (
    <div className="fixed inset-0 z-[80] lg:hidden" role="dialog" aria-modal="true" aria-label="Filter results">
      <button type="button" aria-label="Close filters" onClick={onClose} className="absolute inset-0 bg-slate-950/40" />
      <section className="absolute inset-x-0 bottom-0 max-h-[calc(90vh-50px)] overflow-y-auto rounded-t-3xl bg-white shadow-2xl sm:left-1/2 sm:right-auto sm:top-0 sm:w-[min(28rem,100vw)] sm:max-h-none sm:translate-x-[-50%] sm:rounded-none">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-5 pb-4 pt-5"><h2 className="text-lg font-black text-slate-950">Filter results</h2><button ref={closeButtonRef} type="button" onClick={onClose} className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500">Close</button></div>
        <div className="p-5"><FilterPanel {...props} filters={draft} onToggle={toggleDraft} onPriceChange={changeDraftPrice} onClear={clearDraft} resultCount={previewCount} onApply={() => { props.onApply(draft); onClose(); }} closeLabel={`Show ${previewCount} results`} /></div>
      </section>
    </div>
  );
}
