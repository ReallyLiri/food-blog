import { ALL_LABEL } from "../utils/const";

export const ROUTE_ABOUT = "/about";
export const ROUTE_BLOG = "/blog";
export const ROUTE_OVERVIEW_SEPARATOR = "overview";

export const routeBlogCategory = (category: string) =>
  `${ROUTE_BLOG}/${ROUTE_OVERVIEW_SEPARATOR}/${category}`;

export const routeBlogCategoryPage = (category: string, page: number) =>
  `${routeBlogCategory(category)}/${page}`;

export const routeBlogPost = (slug: string) => `${ROUTE_BLOG}/${slug}`;

export const ROUTE_BLOG_ALL = routeBlogCategory(ALL_LABEL);
