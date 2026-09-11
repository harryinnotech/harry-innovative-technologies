import { WHATSAPP_NUMBER } from "../config/storeConfig";

const QUOTE_REQUESTS_KEY = "harry-innotech-quote-requests-v1";

function readRequests() {
  try {
    const value = window.localStorage.getItem(QUOTE_REQUESTS_KEY);
    return value ? JSON.parse(value) : [];
  } catch {
    return [];
  }
}

function createRequestId() {
  const suffix = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `QT-${suffix}`;
}

export function getQuoteRequests() {
  return readRequests();
}

export async function createQuoteRequest({ listing, listingType, form, quantity, selectedOptions }) {
  const request = {
    id: createRequestId(),
    customerId: null,
    customerName: form.name.trim(),
    phone: form.phone.trim(),
    email: form.email.trim(),
    listingId: listing.id,
    listingType,
    listingName: listing.name,
    providerName: listing.providerName || "Harry Innovative Technologies",
    providerWhatsApp: listing.providerWhatsApp || WHATSAPP_NUMBER,
    quantity: listingType === "PRODUCT" ? quantity : null,
    selectedOptions: selectedOptions || {},
    location: form.location.trim(),
    preferredDate: form.preferredDate,
    preferredTime: form.preferredTime,
    budget: form.budget.trim(),
    message: form.message.trim(),
    serviceDetails: listingType === "SERVICE" ? { ...form.serviceDetails } : {},
    createdAt: new Date().toISOString(),
    status: "PENDING_WHATSAPP",
  };

  const apiUrl = import.meta.env.VITE_QUOTE_API_URL;
  if (apiUrl) {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...request, listing: undefined, providerWhatsApp: undefined }),
    });
    if (!response.ok) throw new Error("Quote request could not be created");
    return response.json();
  }

  const requests = [request, ...readRequests()];
  window.localStorage.setItem(QUOTE_REQUESTS_KEY, JSON.stringify(requests));
  return request;
}

function addLine(lines, label, value) {
  if (value !== undefined && value !== null && String(value).trim()) lines.push(`${label}: ${value}`);
}

export function buildWhatsAppQuoteMessage({ request }) {
  const lines = [
    "Hello, I would like to request a quote.",
    "",
    `Quote Request: #${request.id.replace(/^QT-/, "QT-")}`,
    "",
    `${request.listingType === "PRODUCT" ? "Product" : "Service"}: ${request.listingName}`,
  ];

  addLine(lines, "Quantity", request.quantity);
  const optionText = Object.entries(request.selectedOptions || {}).map(([key, value]) => `${key}: ${value}`).join(", ");
  addLine(lines, "Options", optionText);
  addLine(lines, "Location", request.location);
  addLine(lines, "Preferred date", request.preferredDate);
  addLine(lines, "Preferred time", request.preferredTime);
  addLine(lines, "Budget", request.budget);
  Object.entries(request.serviceDetails || {}).forEach(([key, value]) => addLine(lines, key, value));
  addLine(lines, request.listingType === "PRODUCT" ? "Additional requirements" : "Requirements", request.message);
  lines.push("", `Customer: ${request.customerName}`, `Phone: ${request.phone}`);
  addLine(lines, "Email", request.email);
  lines.push("", request.listingType === "PRODUCT" ? "Please provide your quote and any additional information needed." : "Please review my request and let me know the quote and next steps.");
  return lines.join("\n");
}

export function getWhatsAppUrl(request, message) {
  const number = String(request.providerWhatsApp || "").replace(/[^\d]/g, "");
  if (!number) return "";
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}