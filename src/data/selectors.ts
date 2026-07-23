import {
  companies,
  credibilityAssessments,
  games,
  newsArticles,
  platforms,
} from "@/data";
import type { EntityId } from "@/types";

export function getGameById(id: EntityId) {
  return games.find((game) => game.id === id);
}

export function getCompanyById(id: EntityId) {
  return companies.find((company) => company.id === id);
}

export function getPlatformById(id: EntityId) {
  return platforms.find((platform) => platform.id === id);
}

export function getArticleById(id: EntityId) {
  return newsArticles.find((article) => article.id === id);
}

export function getCredibilityAssessmentByArticleId(articleId: EntityId) {
  return credibilityAssessments.find(
    (assessment) => assessment.articleId === articleId,
  );
}
