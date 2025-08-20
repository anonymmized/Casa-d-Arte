import { Link } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";
import { FadeInStagger, FadeInItem } from "../components/PageTransition.jsx";

export default function Home() {
  const { t } = useTranslation();

  return (
    <section className="relative flex items-center min-h-[70vh] sm:min-h-[80vh] lg:min-h-[90vh]">
      {/* Фон-фото */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: "url(/src/assets/hero-bg.jpg)" }}
        aria-hidden
      />
      {/* Тёмный/молочный оверлей для читаемости текста (адаптивная прозрачность) */}
      <div className="absolute inset-0 -z-10 bg-black/50 sm:bg-black/45 lg:bg-black/40" aria-hidden />

      {/* Контент */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-10">
        <FadeInStagger>
          <FadeInItem>
            <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight drop-shadow-xl mb-4">
              <Trans
                i18nKey="hero.title"
                components={{ brand: <span className="hl-strong" /> }}
              />
            </h1>
          </FadeInItem>

          <FadeInItem>
            <p className="max-w-3xl text-white/90 text-base sm:text-lg mb-8">
              <Trans i18nKey="hero.subtitle" />
            </p>
          </FadeInItem>

          <FadeInItem>
            <div className="flex flex-wrap gap-3">
              <Link to="/catalog" className="btn">
                {t("hero.cta")}
              </Link>
              <Link
                to="/about"
                className="btn-outline border-white/60 text-white hover:bg-white/10"
              >
                {t("hero.about")}
              </Link>
            </div>
          </FadeInItem>
        </FadeInStagger>
      </div>
    </section>
  );
}
