import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useCart } from "../context/CartContext.jsx";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import ThemeToggle from "./ThemeToggle.jsx";

export default function Header() {
  const { itemsCount } = useCart();
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const reduceMotion = useReducedMotion();

  const linkCls = ({ isActive }) =>
    "px-4 py-2 rounded-xl text-sm sm:text-base transition " +
    (isActive ? "bg-gold text-white" : "text-ink-80 hover:bg-gold/10");

  const LangBtn = useMemo(
    () =>
      function LangBtn({ code, label }) {
        const active = i18n.resolvedLanguage === code;
        return (
          <button
            onClick={() => {
              i18n.changeLanguage(code);
              setOpen(false);
            }}
            className={
              "px-3 py-2 rounded-xl border " +
              (active ? "bg-gold text-white border-gold" : "border-gold text-gold hover:bg-gold/10")
            }
            aria-pressed={active}
            aria-label={`Switch language to ${code}`}
          >
            {label}
          </button>
        );
      },
    [i18n]
  );

  // Закрываем меню при смене маршрута
  useEffect(() => {
    if (open) setOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  // Esc + блок скролла
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 bg-surface/80 backdrop-blur border-b border-beige">
      <div className="container mx-auto px-4 sm:px-6 lg:px-10 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="text-2xl font-semibold tracking-tight text-gold text-shadow"
          onClick={() => setOpen(false)}
        >
          {t("brand", "Casa d'Arte")}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-3">
          <NavLink to="/" end className={linkCls}>
            {t("nav.home", "Home")}
          </NavLink>
          <NavLink to="/catalog" className={linkCls}>
            {t("nav.catalog", "Catalog")}
          </NavLink>
          <NavLink to="/about" className={linkCls}>
            {t("nav.about", "About")}
          </NavLink>
          <NavLink to="/contacts" className={linkCls}>
            {t("nav.contacts", "Contacts")}
          </NavLink>
          <NavLink to="/cart" className={linkCls}>
            {t("nav.cart", "Cart")}
            {itemsCount > 0 && (
              <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-gold text-white">
                {itemsCount}
              </span>
            )}
          </NavLink>

          <div className="ml-4 flex items-center gap-2">
            <LangBtn code="ru" label="RU" />
            <LangBtn code="en" label="EN" />
            <ThemeToggle />
          </div>
        </nav>

        {/* Burger */}
        <button
          className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl border border-gold text-gold"
          onClick={() => setOpen((v) => !v)}
          aria-label={t("a11y.toggle_menu", { defaultValue: "Toggle menu" })}
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="currentColor">
            <rect x="3" y="6" width="18" height="2" rx="1" />
            <rect x="3" y="11" width="18" height="2" rx="1" />
            <rect x="3" y="16" width="18" height="2" rx="1" />
          </svg>
        </button>
      </div>

      {/* Mobile nav */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-beige bg-surface"
          >
            <nav
              id="mobile-nav"
              className="container mx-auto px-4 sm:px-6 lg:px-10 py-3 flex flex-col gap-2"
              onClick={() => setOpen(false)}
            >
              <NavLink to="/" end className={linkCls}>
                {t("nav.home", "Home")}
              </NavLink>
              <NavLink to="/catalog" className={linkCls}>
                {t("nav.catalog", "Catalog")}
              </NavLink>
              <NavLink to="/about" className={linkCls}>
                {t("nav.about", "About")}
              </NavLink>
              <NavLink to="/contacts" className={linkCls}>
                {t("nav.contacts", "Contacts")}
              </NavLink>
              <NavLink to="/cart" className={linkCls}>
                {t("nav.cart", "Cart")}
                {itemsCount > 0 && (
                  <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-gold text-white">
                    {itemsCount}
                  </span>
                )}
              </NavLink>

              <div className="pt-2 flex items-center gap-2">
                <LangBtn code="ru" label="RU" />
                <LangBtn code="en" label="EN" />
                <ThemeToggle />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
