export type EntityId = string;
export type ISODateString = string;

export interface Platform {
  id: EntityId;
  name: string;
  shortName: string;
  manufacturer: string;
  color: string;
}

export interface Genre {
  id: EntityId;
  name: string;
  slug: string;
}

export interface Company {
  id: EntityId;
  name: string;
  slug: string;
  websiteUrl?: string;
  logoUrl?: string;
}

export type GameStatus =
  | "announced"
  | "in-development"
  | "early-access"
  | "released"
  | "delayed"
  | "cancelled";

export interface Game {
  id: EntityId;
  slug: string;
  title: string;
  summary: string;
  description: string;
  coverImageUrl: string;
  heroImageUrl?: string;
  developerId: EntityId;
  publisherId: EntityId;
  genreIds: EntityId[];
  platformIds: EntityId[];
  status: GameStatus;
  officialWebsiteUrl?: string;
}

export type ReleasePrecision = "exact" | "month" | "quarter" | "year" | "tbd";
export type ReleaseStatus = "confirmed" | "expected" | "delayed" | "released";

export interface GameRelease {
  id: EntityId;
  gameId: EntityId;
  platformIds: EntityId[];
  releaseDate?: ISODateString;
  releaseWindowLabel: string;
  precision: ReleasePrecision;
  status: ReleaseStatus;
  region: "worldwide" | "north-america" | "europe" | "asia";
  sourceUrl?: string;
}

export type NewsCategory =
  "announcement" | "release" | "industry" | "update" | "rumor" | "leak";

export interface NewsArticle {
  id: EntityId;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  category: NewsCategory;
  author: string;
  sourceName: string;
  sourceUrl: string;
  publishedAt: ISODateString;
  updatedAt?: ISODateString;
  imageUrl?: string;
  relatedGameIds: EntityId[];
  credibilityAssessmentId?: EntityId;
}

export type CredibilityVerdict =
  "verified" | "credible" | "unconfirmed" | "questionable" | "false";

export interface CredibilityAssessment {
  id: EntityId;
  articleId: EntityId;
  score: number;
  verdict: CredibilityVerdict;
  rationale: string;
  evidence: string[];
  assessedAt: ISODateString;
}

export type FavoriteTargetType = "game" | "article";

export interface Favorite {
  id: EntityId;
  userId: EntityId;
  targetType: FavoriteTargetType;
  targetId: EntityId;
  createdAt: ISODateString;
}

export type CalendarEventType =
  "release" | "showcase" | "update" | "early-access" | "beta";

export interface CalendarEvent {
  id: EntityId;
  title: string;
  description: string;
  startAt: ISODateString;
  endAt?: ISODateString;
  allDay: boolean;
  type: CalendarEventType;
  gameId?: EntityId;
  releaseId?: EntityId;
  platformIds: EntityId[];
  location?: string;
  sourceUrl?: string;
}
