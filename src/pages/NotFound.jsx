// src/pages/NotFound.jsx
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-2xl p-8 text-center">
      <h1 className="text-3xl font-bold mb-3">404 – Страница не найдена</h1>
      <p className="text-neutral-600 mb-6">
        К сожалению, запрошенная страница отсутствует.
      </p>
      <Link
        to="/"
        className="inline-block rounded-xl bg-black text-white px-4 py-2 hover:bg-neutral-800 transition"
      >
        Вернуться на главную
      </Link>
    </section>
  );
}
