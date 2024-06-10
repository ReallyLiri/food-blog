export const ROUTE_ABOUT = "/about";
export const ROUTE_BLOG = "/blog";
export const routeBlogCategory = (category: string) =>
  `${ROUTE_BLOG}/overview/${category}`;

export const routeBlogCategoryPage = (category: string, page: number) =>
  `${routeBlogCategory(category)}/${page}`;

export const routeBlogPost = (slug: string) => `${ROUTE_BLOG}/${slug}`;

export const ROUTE_BLOG_ALL = routeBlogCategory("all");
