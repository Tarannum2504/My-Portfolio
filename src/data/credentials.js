import {
  achievements,
  featuredAchievementIds,
} from "./portfolio";

export { achievements } from "./portfolio";

export function getFeaturedAchievements() {
  return achievements.filter((a) => featuredAchievementIds.includes(a.id));
}
