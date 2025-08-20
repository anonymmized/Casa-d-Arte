import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-10 border-t border-beige bg-surface">
      <div className="container mx-auto px-4 sm:px-6 lg:px-10 py-8 grid gap-6 md:grid-cols-3">
        <div>
          <div className="text-gold font-semibold text-lg">Casa d'Arte</div>
          <p className="mt-2 text-ink/80">
            Contemporary objects & fine art. Curated with love.
          </p>
        </div>

        <nav className="grid gap-2">
          <Link to="/" className="text-ink/80 hover:text-ink">Home</Link>
          <Link to="/catalog" className="text-ink/80 hover:text-ink">Catalog</Link>
          <Link to="/about" className="text-ink/80 hover:text-ink">About</Link>
          <Link to="/contacts" className="text-ink/80 hover:text-ink">Contacts</Link>
        </nav>

        <div className="grid gap-2">
          <a href="mailto:hello@casadearte.example" className="text-ink/80 hover:text-ink">
            hello@casadearte.example
          </a>
          <a href="tel:+1234567890" className="text-ink/80 hover:text-ink">
            +1 234 567 890
          </a>
          <p className="text-ink/80">Mon–Fri 10:00–18:00</p>
        </div>
      </div>

      <div className="border-t border-beige">
        <div className="container mx-auto px-4 sm:px-6 lg:px-10 py-4 flex items-center justify-between text-ink/80">
          <span>© {new Date().getFullYear()} Casa d'Arte</span>
          <span>All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
