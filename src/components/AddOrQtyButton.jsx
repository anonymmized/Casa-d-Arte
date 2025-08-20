import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "../context/CartContext.jsx";
import { useTranslation } from "react-i18next";

export default function AddOrQtyButton({ item, className = "" }) {
  const { t } = useTranslation();
  const { qtyById, addToCart, inc, dec } = useCart();
  const qty = qtyById(item.id);

  return (
    <div className={className}>
      <AnimatePresence mode="wait" initial={false}>
        {qty === 0 ? (
          <motion.button
            key="add"
            onClick={() => addToCart(item)}
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="w-full inline-flex items-center justify-center rounded-xl px-4 py-2 bg-gold text-white hover:bg-gold/90 transition"
          >
            {t("catalog.add", "Add to cart")}
          </motion.button>
        ) : (
          <motion.div
            key="qty"
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="w-full inline-flex items-center justify-between rounded-xl border border-beige/50 px-2 py-2"
            aria-label={t("cart.qty_controls", "Quantity controls")}
          >
            <button
              onClick={() => dec(item.id)}
              className="w-9 h-9 rounded-lg bg-beige/20 hover:bg-beige/30 text-ink text-xl leading-none"
              aria-label={t("cart.decrease", "Decrease")}
            >
              –
            </button>
            <span className="min-w-8 text-center font-medium">{qty}</span>
            <button
              onClick={() => inc(item)}
              className="w-9 h-9 rounded-lg bg-gold text-white hover:bg-gold/90 text-xl leading-none"
              aria-label={t("cart.increase", "Increase")}
            >
              +
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
