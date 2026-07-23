import { PageIntro } from "@/components/ui/page-intro";

export const metadata = { title: "Admin" };

export default function AdminPage() {
  return (
    <section className="container-shell page-section">
      <PageIntro
        eyebrow="Administration"
        title="Editorial control center."
        description="This protected route is reserved for release verification, credibility review, and content operations."
      />
    </section>
  );
}
