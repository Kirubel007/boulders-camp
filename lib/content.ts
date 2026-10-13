// Single entry point for all site content.
// Today it reads local JSON; a headless CMS could replace these imports
// with fetch calls that return the same shapes, without touching components.
import site from "@/content/site.json";
import home from "@/content/home.json";
import suites from "@/content/suites.json";
import day from "@/content/day.json";
import planner from "@/content/planner.json";
import experience from "@/content/experience.json";
import suitesPage from "@/content/suites-page.json";

export { site, home, suites, day, planner, experience, suitesPage };

export type Site = typeof site;
export type Home = typeof home;
export type Suite = (typeof suites)[number];
export type DayMoment = (typeof day)[number];
export type Planner = typeof planner;
export type ImageRef = { src: string; alt: string };
export type GalleryItem = ImageRef & { caption?: string };

export function whatsappHref(message = site.contact.whatsappMessage) {
  return `https://wa.me/${site.contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
