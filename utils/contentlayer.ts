import type { Blog, DocumentTypes } from "contentlayer/generated";
import { allBlogs } from "contentlayer/generated";

export function dateSortDesc(a: string, b: string) {
  if (a > b) return -1;
  if (a < b) return 1;
  return 0;
}

export function sortedBlogPost(allBlogs: Blog[]) {
  return allBlogs.sort((a, b) => dateSortDesc(a.date, b.date));
}

export const omit = <Obj, Keys extends keyof Obj>(
  obj: Obj,
  keys: Keys[],
): Omit<Obj, Keys> => {
  const result = Object.assign({}, obj);
  keys.forEach((key) => {
    delete result[key];
  });
  return result;
};

export type CoreContent<T> = Omit<T, "body" | "_raw" | "_id">;

export function coreContent<T extends DocumentTypes>(content: T) {
  return omit(content, ["body", "_raw", "_id"]);
}

export function allCoreContent<T extends DocumentTypes>(contents: T[]) {
  return contents.map((c) => coreContent(c));
}

interface ICategory {
  category: string;
  total: number;
}

export function getPostsCategoriesGroup() {
  const categories = allBlogs.reduce((categories: ICategory[], blog) => {
    blog.categories?.forEach((category) => {
      const findCategory = categories.find((c) => c.category === category);
      if (findCategory) {
        findCategory.total++;
      } else {
        categories.push({ category, total: 1 });
      }
    });
    return categories;
  }, []);
  categories.push({ category: "All", total: allBlogs.length });
  return categories;
}
