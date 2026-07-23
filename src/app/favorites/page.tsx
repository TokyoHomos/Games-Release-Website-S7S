import { PageIntro } from "@/components/ui/page-intro";
import { favorites } from "@/data";

export const metadata = { title: "Favorites" };

export default function FavoritesPage() {
  return (
    <section className="container-shell page-section">
      <PageIntro
        eyebrow="Your watchlist"
        title="Keep the important signals close."
        description="Saved games and stories will live here. Authentication and persistence are intentionally deferred beyond the mock foundation."
      />
      <p className="border-border bg-surface text-secondary mt-12 rounded-xl border p-6">
        {favorites.length} example favorites are ready for the upcoming account
        integration.
      </p>
    </section>
  );
}
