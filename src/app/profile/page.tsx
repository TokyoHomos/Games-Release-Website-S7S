import { PageIntro } from "@/components/ui/page-intro";

export const metadata = { title: "Profile" };

export default function ProfilePage() {
  return (
    <section className="container-shell page-section">
      <PageIntro
        eyebrow="Profile"
        title="Your signal, tuned to you."
        description="Account preferences, platform filters, and notification settings will be implemented after identity is selected."
      />
    </section>
  );
}
