import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from "next";

import { mainNavLinks } from "@/components/sidebar/blog-sidebar";
import BaseLayout from "layout/base-layout";
import { allCoreContent } from "utils/contentlayer";
import {
  allSortedBlogPosts,
  POSTS_PER_PAGE,
  postsCategoriesGroup,
  PostsListPage,
} from "./index";
import { type Blog } from "contentlayer/generated";
import { ALL_LABEL } from "../../../../utils/const";

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = postsCategoriesGroup.reduce((paths, categoryObj) => {
    const categoryTotalPage = Math.ceil(categoryObj.total / POSTS_PER_PAGE);
    const subPaths = Array.from({ length: categoryTotalPage }, (_, i) => ({
      params: {
        category: categoryObj.category.toLocaleLowerCase(),
        page: (i + 1).toString(),
      },
    }));
    return [...paths, ...subPaths];
  }, []);

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const {
    params: { page, category },
  } = context;

  const posts =
    category === ALL_LABEL
      ? allSortedBlogPosts
      : allSortedBlogPosts.reduce((posts: Blog[], post) => {
          post.slug.startsWith(category as string) && posts.push(post);
          return posts;
        }, []);
  const containerTitle = mainNavLinks.find((nav) =>
    nav.href.includes(category as string),
  ).label;

  const pageNumber = parseInt(page as string);
  const initialDisplayPosts = posts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber,
  );

  const pagination = {
    defaultCurrent: pageNumber,
    pageSize: POSTS_PER_PAGE,
    total: posts.length,
  };

  return {
    props: {
      initialDisplayPosts: allCoreContent(initialDisplayPosts),
      pagination,
      containerTitle,
    },
  };
};

export default function PostsPage({
  initialDisplayPosts,
  pagination,
  containerTitle,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <BaseLayout>
      <PostsListPage
        pageContainerTitle={containerTitle}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
      />
    </BaseLayout>
  );
}
