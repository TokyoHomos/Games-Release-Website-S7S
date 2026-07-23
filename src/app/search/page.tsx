import { PageIntro } from "@/components/ui/page-intro";

export const metadata = { title: "Search" };

export default function SearchPage() {
  return (
    <section className="container-shell page-section">
      <PageIntro
        eyebrow="Search"
        title="Find games, dates, and reporting."
        description="The route boundary is ready for indexed search and filters in a future contribution."
      />
      <form className="mt-10 max-w-2xl" role="search">
        <label className="text-sm font-semibold" htmlFor="site-search">
          Search GameSignal
        </label>
        <input
          className="border-border bg-surface focus:border-primary mt-2 w-full rounded-lg border px-4 py-3 outline-none"
          id="site-search"
          name="query"
          placeholder="Try “Echoes of Aether”"
          type="search"
        />
      </form>
    </section>
  );
}
