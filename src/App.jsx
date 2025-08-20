// src/App.jsx
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Suspense, lazy } from "react";
import Backdrop from "./components/Backdrop";
import ScrollToTop from "./components/ScrollToTop.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import PageTransition from "./components/PageTransition.jsx";

const Home     = lazy(() => import("./pages/Home.jsx"));
const Catalog  = lazy(() => import("./pages/Catalog.jsx"));
const About    = lazy(() => import("./pages/About.jsx"));
const Contacts = lazy(() => import("./pages/Contacts.jsx"));
const Cart     = lazy(() => import("./pages/Cart.jsx"));

// Встроенная 404, чтобы не ломалось, даже если файла нет
function NotFoundInline() {
  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-10 py-10 text-center">
      <h1 className="text-3xl font-semibold mb-2">Страница не найдена</h1>
      <a href="/" className="inline-block mt-4 rounded-xl px-4 py-2 bg-black text-white">
        На главную
      </a>
    </section>
  );
}

export default function App() {
  const location = useLocation();

  return (
    <>
        <Backdrop />
        <CartProvider>
        <div className="min-h-screen flex flex-col">
            <Header />
            <ScrollToTop />

            <main className="flex-1">
            <AnimatePresence mode="wait" initial={false}>
                <Suspense fallback={<div className="p-6">Загрузка…</div>}>
                <Routes location={location} key={location.pathname}>
                    <Route path="/"         element={<PageTransition><Home /></PageTransition>} />
                    <Route path="/catalog"  element={<PageTransition><Catalog /></PageTransition>} />
                    <Route path="/about"    element={<PageTransition><About /></PageTransition>} />
                    <Route path="/contacts" element={<PageTransition><Contacts /></PageTransition>} />
                    <Route path="/cart"     element={<PageTransition><Cart /></PageTransition>} />
                    <Route path="*"         element={<PageTransition><NotFoundInline /></PageTransition>} />
                </Routes>
                </Suspense>
            </AnimatePresence>
            </main>

            <Footer />
        </div>
        </CartProvider>
    </>
  );
}
