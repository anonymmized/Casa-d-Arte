import * as data from "../data/products.js";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import AddOrQtyButton from "../components/AddOrQtyButton.jsx";
import { formatPriceFromRub as fmtRub } from "../utils/price.js";

/** Безопасно получаем массив товаров независимо от типа экспорта */
function getProductsSafe(mod) {
  const candidates = [mod?.default, mod?.products, Array.isArray(mod) ? mod : null].filter(Boolean);
  const list = candidates.find(Array.isArray) || [];
  return list.map((p, i) => ({
    id: p?.id ?? `p-${i}`,
    title: p?.title ?? "—",
    price: typeof p?.price === "number" ? p.price : 0,
    image: p?.image ?? "",
  }));
}
const products = getProductsSafe(data);

/** Формат цены с фоллбеком */
function money(valueRub, lang) {
  try {
    if (typeof fmtRub === "function") return fmtRub(valueRub, lang);
  } catch {}
  const currency = lang?.startsWith("ru") ? "RUB" : "USD";
  const amount = currency === "RUB" ? valueRub : valueRub / 90;
  return new Intl.NumberFormat(lang || "en", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(amount ?? 0);
}

export default function Catalog() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  // id последнего товара, с которым взаимодействовали
  const [lastInteractedId, setLastInteractedId] = useState(null);
  const markLast = (id) => setLastInteractedId(id);

  const goToCartText = useMemo(() => t("catalog.goToCart", "В корзину"), [t]);

  const goToCart = (e) => {
    e?.stopPropagation?.();
    navigate("/cart");
  };

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-10 py-10">
      <h2 className="text-3xl font-semibold mb-6 text-ink">
        {t("catalog.title", "Catalog")}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p) => (
          <div
            key={p.id}
            className="group relative rounded-2xl p-[1px]
                       bg-gradient-to-br from-gold/60 via-beige/40 to-transparent
                       hover:from-gold hover:via-gold/60 transition-colors duration-300"
          >
            <article
              className="card rounded-2xl h-full flex flex-col
                         transition-transform duration-300 group-hover:-translate-y-0.5"
            >
              {/* image */}
              <div className="w-full aspect-square overflow-hidden rounded-[1rem] bg-surface">
                {p.image ? (
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                ) : (
                  <div className="w-full h-full grid place-items-center text-sm text-ink/60">
                    no image
                  </div>
                )}
              </div>

              {/* text */}
              <div className="mt-4 flex-1">
                <h3 className="text-xl font-medium leading-snug min-h-[2.75rem] text-ink">
                  {p.title}
                </h3>
                <p className="mt-1 text-lg text-ink/80">
                  {money(p.price, i18n.language)}
                </p>
              </div>

              {/* controls pinned to bottom */}
              <div
                className="mt-4 pt-1 flex items-center gap-3"
                // Фоллбек: любой клик по блоку с контролом помечает товар последним
                onClick={() => markLast(p.id)}
              >
                <AddOrQtyButton
                  item={p}
                  // Если внутри компонента поддерживаются колбэки — используем их
                  onAdd={() => markLast(p.id)}
                  onChange={() => markLast(p.id)}
                  onIncrement={() => markLast(p.id)}
                  onDecrement={() => markLast(p.id)}
                />

                {lastInteractedId === p.id && (
                  <button
                    type="button"
                    onClick={goToCart}
                    className="px-4 py-2 rounded-[1rem] border border-ink/15 text-ink/90 bg-surface/60 hover:bg-surface/80 hover:border-ink/25 transition"
                    aria-label={goToCartText}
                  >
                    {goToCartText}
                  </button>
                )}
              </div>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}
