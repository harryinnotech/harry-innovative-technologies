function hasValues(value) {
  return value && Object.keys(value).length > 0;
}

function SpecificationTable({ title, values }) {
  if (!hasValues(values)) return null;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <h2 className="text-2xl font-black tracking-tight text-slate-950">{title}</h2>
      <dl className="mt-6 divide-y divide-slate-200">
        {Object.entries(values).map(([label, value]) => (
          <div key={label} className="grid gap-1 py-4 sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] sm:gap-6">
            <dt className="text-sm font-bold text-slate-500">{label}</dt>
            <dd className="text-sm leading-6 text-slate-900">{String(value)}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function ListSection({ title, items }) {
  if (!items?.length) return null;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <h2 className="text-2xl font-black tracking-tight text-slate-950">{title}</h2>
      <ul className="mt-5 grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-6 text-slate-700">
            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-green-500" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function ProductInformationSections({ product }) {
  return (
    <div className="mt-16">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-2xl font-black tracking-tight text-slate-950">Product description</h2>
        <p className="mt-5 max-w-4xl leading-8 text-slate-600">{product.fullDescription || product.description}</p>
      </section>

      <div className="mt-6 columns-1 gap-6 lg:columns-2">
        <div className="mb-6 break-inside-avoid"><ListSection title="Key features" items={product.features} /></div>
        <div className="mb-6 break-inside-avoid"><SpecificationTable title="Technical specifications" values={product.specifications} /></div>
        <div className="mb-6 break-inside-avoid"><SpecificationTable title="Electrical specifications" values={product.electricalSpecifications} /></div>
        <div className="mb-6 break-inside-avoid"><SpecificationTable title="Performance specifications" values={product.performanceSpecifications} /></div>
        <div className="mb-6 break-inside-avoid"><SpecificationTable title="Physical specifications" values={product.physicalSpecifications} /></div>
        <div className="mb-6 break-inside-avoid"><ListSection title="Compatibility" items={product.compatibility} /></div>
        <div className="mb-6 break-inside-avoid"><ListSection title="Installation information" items={product.installationInformation} /></div>
        <div className="mb-6 break-inside-avoid"><ListSection title="Installer information" items={product.installerInformation} /></div>
        <div className="mb-6 break-inside-avoid"><ListSection title="What's included" items={product.includedInBox} /></div>
        <div className="mb-6 break-inside-avoid"><ListSection title="Recommended / required accessories" items={product.recommendedAccessories} /></div>
        <div className="mb-6 break-inside-avoid"><ListSection title="Safety information" items={product.safetyInformation} /></div>
        <div className="mb-6 break-inside-avoid"><ListSection title="Maintenance & care" items={product.maintenanceInformation} /></div>

        {product.warranty?.duration || product.warranty?.information ? (
          <div className="mb-6 break-inside-avoid"><section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-black tracking-tight text-slate-950">Warranty</h2>
            {product.warranty.duration && <p className="mt-5 text-sm font-bold text-slate-900">{product.warranty.duration}</p>}
            {product.warranty.information && <p className="mt-2 text-sm leading-6 text-slate-600">{product.warranty.information}</p>}
          </section></div>
        ) : null}

        {product.certifications?.length ? <div className="mb-6 break-inside-avoid"><ListSection title="Certifications" items={product.certifications} /></div> : null}

        {product.downloads?.length ? (
          <div className="mb-6 break-inside-avoid"><section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-black tracking-tight text-slate-950">Downloads</h2>
            <div className="mt-5 flex flex-wrap gap-3">
              {product.downloads.map((download) => <a key={download.label || download.name} href={download.url} target="_blank" rel="noreferrer" className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-blue-700 hover:border-blue-300">{download.label || download.name}</a>)}
            </div>
          </section></div>
        ) : null}

        {product.notes?.length ? <div className="mb-6 break-inside-avoid"><ListSection title="Important notes" items={product.notes} /></div> : null}
      </div>
    </div>
  );
}
