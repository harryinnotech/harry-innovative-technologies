import { WHATSAPP_NUMBER } from "../../config/storeConfig";
import { formatPrice } from "../../utils/formatPrice";

export function buildWhatsAppMessage({ customer, items, total }) {
  const products = items.filter((item) => !item.quoteRequired);
  const services = items.filter((item) => item.quoteRequired);
  const productLines = products.map((item, index) => `${index + 1} × ${item.name} | Brand: ${item.brand || "Contact us to confirm"} | Model: ${item.model || "Contact us to confirm"} — ${formatPrice(item.price * item.quantity)}`);
  const serviceLines = services.map((item) => `${item.quantity} × ${item.name} — Request a Quote`);
  return [
    "Hello, I would like to make an enquiry/order from HarryInnoTech.",
    "",
    "CUSTOMER",
    `Name: ${customer.name}`,
    `WhatsApp: ${customer.phone}`,
    `Address: ${customer.address}`,
    `Note: ${customer.note || "None"}`,
    "",
    "ITEMS",
    ...(productLines.length ? ["", "PRODUCT", ...productLines] : []),
    ...(serviceLines.length ? ["", "SERVICE / QUOTE REQUEST", ...serviceLines] : []),
    "",
    `Total products: ${formatPrice(total)}`,
    "Please contact me to confirm availability, installation requirements and final pricing.",
  ].join("\n");
}

export default function WhatsAppOrderButton({ customer, items, total, onInitiated }) {
  const handleOrder = () => {
    try {
      const message = buildWhatsAppMessage({ customer, items, total });
      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
      window.open(url, "_blank", "noopener,noreferrer");
      onInitiated();
    } catch {
      onInitiated(new Error("Unable to open WhatsApp"));
    }
  };

  return <button type="button" onClick={handleOrder} className="w-full rounded-xl bg-green-600 px-5 py-4 text-sm font-black text-white shadow-lg shadow-green-600/20 transition hover:-translate-y-0.5 hover:bg-green-700">Send order / quote on WhatsApp</button>;
}
