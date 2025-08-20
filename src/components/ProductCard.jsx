import AddOrQtyButton from "./AddOrQtyButton.jsx";
import { useTranslation } from "react-i18next";
// в проекте ранее встречались оба форматтера — подстрахуемся:
import { formatPriceFromRub as fmtRub } from "../utils/price.js";

function safePrice(price, lang) {
  try {
    if (typeof fmtRub === "function") return fmtRub(price, lang);
  } catch {}
  // запасной вариант: простой Intl.NumberFormat в USD, чтобы не падало
  try {
    return new Intl.NumberFormat(lang || "en", {
      style: "currency",
      currency: lang?.startsWith("ru") ? "RUB" : "USD",
      maximumFractionDigits: 2,
    }).format(price ?? 0);
  } catch {
    return String(price ?? 0);
  }
}

export default function ProductCard({ product }) {
  const { i18n } = useTranslation();
  const title = product?.title ?? "—";
  const img   = product?.image ?? "";
  const price = product?.price ?? 0;

  return (
    <div className="rounded-2xl p-4 border border-beige/40 bg-white shadow-sm/10 hover:shadow-md transition flex flex-col">
      <div className="aspect-square w-full overflow-hidden rounded-xl bg-beige/10">
        {img ? (
          <img src={img} alt={title} loading="lazy" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full grid place-items-center text-ink/40 text-sm">No image</div>
        )}
      </div>

      <div className="mt-3 flex-1">
        <h3 className="text-lg font-semibold text-ink">{title}</h3>
        <p className="mt-1 text-ink/80">{safePrice(price, i18n.language)}</p>
      </div>

      <AddOrQtyButton item={product} className="mt-3" />
    </div>
  );
}
