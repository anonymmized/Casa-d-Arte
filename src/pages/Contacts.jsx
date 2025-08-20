import { useTranslation } from "react-i18next";

export default function Contacts() {
  const { t } = useTranslation();

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-10 py-10 max-w-3xl">
      <h2 className="text-3xl font-semibold mb-4 text-shadow-lg">{t("contacts.title")}</h2>

      <ul className="space-y-2 text-ink/80">
        <li><span className="hl-underline">{t("contacts.email")}:</span> hello@casadearte.example</li>
        <li><span className="hl-underline">{t("contacts.phone")}:</span> +7 (900) 000-00-00</li>
        <li>
          <span className="hl-underline">{t("contacts.address")}:</span>{" "}
          <span className="hl">{t("contacts.address_value")}</span>
        </li>
      </ul>

      <p className="mt-6 text-sm text-ink/60">
        {t("contacts.orderNote", { handle: "@example" })}
      </p>
    </section>
  );
}
