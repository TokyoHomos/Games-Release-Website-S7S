import { AnticipatedGamesSection } from "@/components/home/anticipated-games-section";
import { FeaturedReleaseHero } from "@/components/home/featured-release-hero";
import { HomepageCta } from "@/components/home/homepage-cta";
import { PersonalizedFeedSection } from "@/components/home/personalized-feed-section";
import { ReleaseCalendarSection } from "@/components/home/release-calendar-section";
import { ReleasingTodaySection } from "@/components/home/releasing-today-section";
import { TrendingTagsSection } from "@/components/home/trending-tags-section";
import { ReleaseFilters } from "@/components/games/release-filters";
import { PageContainer } from "@/components/layout/page-container";

export function HomePage() {
  return (
    <>
      <FeaturedReleaseHero />

      <PageContainer className="grid gap-10 py-10 lg:grid-cols-[16rem_1fr] lg:items-start lg:gap-12">
        <ReleaseFilters />
        <div className="flex min-w-0 flex-col gap-16">
          <ReleasingTodaySection />
          <ReleaseCalendarSection />
          <PersonalizedFeedSection />
          <AnticipatedGamesSection />
          <TrendingTagsSection />
        </div>
      </PageContainer>

      <HomepageCta />
    </>
  );
}
