// src/context/CartContext.jsx
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartCtx = createContext(null);
const STORAGE_KEY = "cda_cart_v1";

function loadInitial() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    // sanity-check
    if (parsed && typeof parsed === "object") return parsed;
  } catch {}
  return {};
}

export function CartProvider({ children }) {
  // Структура: { [id]: { item, qty } }
  const [cart, setCart] = useState(loadInitial);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch {}
  }, [cart]);

  // API
  const addToCart = (item) => {
    if (!item || item.id == null) return;
    setCart((c) => {
      const cur = c[item.id]?.qty ?? 0;
      return { ...c, [item.id]: { item, qty: cur + 1 } };
    });
  };

  const inc = (item) => addToCart(item);

  const dec = (id) => {
    if (id == null) return;
    setCart((c) => {
      const cur = c[id]?.qty ?? 0;
      if (cur <= 1) {
        const { [id]: _, ...rest } = c;
        return rest;
      }
      return { ...c, [id]: { ...c[id], qty: cur - 1 } };
    });
  };

  const removeFromCart = (id) => {
    if (id == null) return;
    setCart((c) => {
      const { [id]: _, ...rest } = c;
      return rest;
    });
  };

  const clearCart = () => setCart({});

  const setQuantity = (id, qty) => {
    if (id == null) return;
    const q = Math.max(0, Number(qty) || 0);
    setCart((c) => {
      if (q === 0) {
        const { [id]: _, ...rest } = c;
        return rest;
      }
      const item = c[id]?.item || null;
      return { ...c, [id]: { item: item ?? { id }, qty: q } };
    });
  };

  // Селекторы
  const items = useMemo(
    () =>
      Object.values(cart).map(({ item, qty }) => ({
        ...item,
        qty,
        lineTotal: (item?.price ?? 0) * qty,
      })),
    [cart]
  );

  const itemsCount = useMemo(
    () => items.reduce((s, x) => s + x.qty, 0),
    [items]
  );

  const subtotal = useMemo(
    () => items.reduce((s, x) => s + x.lineTotal, 0),
    [items]
  );

  const qtyById = (id) => (cart[id]?.qty ?? 0);

  const value = {
    cart,
    items,
    itemsCount,
    subtotal,
    addToCart,
    inc,
    dec,
    removeFromCart,
    clearCart,
    setQuantity,
    qtyById,
  };

  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}

export function useCart() {
  const ctx = useContext(CartCtx);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
