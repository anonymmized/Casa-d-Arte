import { useTranslation } from "react-i18next";
import { useCart } from "../context/CartContext.jsx";
import { formatPriceFromRub as fmtRub } from "../utils/price.js";

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

export default function Cart() {
  const { t, i18n } = useTranslation();
  const cart = useCart();

  // ожидаемые поля/методы контекста; если отличаются — замени:
  const items = cart.items ?? [];                      // [{id, title, price, image, qty}]
  const inc = cart.inc ?? (() => {});                  // (item) или (id)
  const dec = cart.dec ?? (() => {});                  // (id)
  const remove = cart.remove ?? cart.removeItem ?? (() => {}); // (id)
  const clear = cart.clear ?? cart.clearCart ?? (() => {});
  const totalRub =
    cart.totalRub ??
    items.reduce((sum, it) => sum + (it.price || 0) * (it.qty || 0), 0);

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-10 py-10">
      <h1 className="text-3xl font-semibold text-ink">{t("cart.title", "Cart")}</h1>

      {items.length === 0 ? (
        <p className="mt-6 text-ink-80">{t("cart.empty", "Your cart is empty.")}</p>
      ) : (
        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">
          {/* Список товаров */}
          <div className="card">
            <ul className="divide-y divide-[color:var(--beige)]">
              {items.map((it) => (
                <li key={it.id} className="py-4 flex items-center gap-4">
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-surface border border-beige">
                    {it.image ? (
                      <img
                        src={it.image}
                        alt={it.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full grid place-items-center text-muted text-xs">
                        no image
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-ink font-medium leading-snug">{it.title}</h3>
                    <p className="text-ink-80">{money(it.price, i18n.language)}</p>
                  </div>

                  {/* qty controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => dec(it.id)}
                      className="w-9 h-9 rounded-lg border border-beige bg-surface hover:bg-gold/10"
                      aria-label={t("cart.decrease", "Decrease")}
                    >
                      –
                    </button>
                    <span className="min-w-8 text-center text-ink font-medium">
                      {it.qty ?? 0}
                    </span>
                    <button
                      onClick={() => inc(it)}
                      className="w-9 h-9 rounded-lg bg-gold text-white hover:opacity-90"
                      aria-label={t("cart.increase", "Increase")}
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => remove(it.id)}
                    className="ml-3 text-ink-80 hover:text-ink"
                    aria-label={t("cart.remove", "Remove")}
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Итог */}
          <aside className="card h-max sticky top-24">
            <h2 className="text-xl font-semibold text-ink">
              {t("cart.summary", "Order summary")}
            </h2>

            <div className="mt-4 flex items-center justify-between text-ink">
              <span>{t("cart.total", "Total")}</span>
              <span className="text-lg font-semibold">
                {money(totalRub, i18n.language)}
              </span>
            </div>

            <div className="mt-6 grid gap-3">
              <button className="btn">{t("cart.checkout", "Checkout")}</button>
              <button onClick={clear} className="btn-outline">
                {t("cart.clear", "Clear cart")}
              </button>
            </div>
          </aside>
        </div>
      )}
    </section>
  );
}
