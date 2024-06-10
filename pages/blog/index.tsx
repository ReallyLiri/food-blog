import type { NextPage } from "next";
import Router from "next/router";
import { useEffect } from "react";
import { ROUTE_BLOG_ALL } from "../../layout/routes";

const HomePage: NextPage = () => {
  useEffect(() => {
    Router.push(ROUTE_BLOG_ALL);
  }, []);
  return <></>;
};

export default HomePage;
