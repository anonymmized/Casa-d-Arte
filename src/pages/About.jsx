import { Trans, useTranslation } from "react-i18next";

export default function About() {
  const { t } = useTranslation();

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-10 py-10 max-w-3xl">
      <h2 className="text-3xl font-semibold mb-4 text-shadow-lg">{t("about.title")}</h2>

      <p className="text-ink/80 leading-relaxed">
        <Trans
          i18nKey="about.body"
          components={{
            brand: <span className="hl-strong" />,
            em: <span className="underline-grad" />
          }}
        />
      </p>
    </section>
  );
}
