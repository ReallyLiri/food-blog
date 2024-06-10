import { CalendarIcon } from "@chakra-ui/icons";
import {
  Box,
  Center,
  Flex,
  List,
  ListItem,
  ListProps,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import * as React from "react";
import { ReactElement, ReactNode } from "react";
import { DiJavascript } from "react-icons/di";
import { FaCss3Alt, FaNodeJs, FaReact, FaVuejs } from "react-icons/fa";
import { FiPenTool } from "react-icons/fi";
import { SiWebpack } from "react-icons/si";
import useSound from "use-sound";
import { getPostsCategoriesGroup } from "utils/contentlayer";

type MainNavLinkProps = {
  href: string;
  icon: ReactElement;
  children: ReactNode;
  label?: string;
};

export const isMainNavLinkActive = (href: string, path: string) => {
  // const [_, blog, category] = path.split('/');
  const [blog, category] = path.split("/").slice(1);
  const isMain = path.includes("overview")
    ? path.includes(href)
    : href.includes(`${blog}/overview/${category}`);

  return isMain;
};

const MainNavLink = ({ href, icon, children }: MainNavLinkProps) => {
  const { asPath } = useRouter();
  const active = isMainNavLinkActive(href, asPath);
  const linkColor = useColorModeValue("gray.900", "whiteAlpha.900");

  return (
    <NextLink href={href} passHref>
      <Flex
        as="a"
        align="center"
        fontSize="md"
        transitionProperty="colors"
        transitionDuration="200ms"
        fontWeight={active ? "extrabold" : "normal"}
        color={active ? "teal.500" : linkColor}
        _hover={{ color: active ? undefined : "teal.500" }}
      >
        <Center
          w="6"
          h="6"
          borderWidth="1px"
          bg={active ? "teal.500" : "transparent"}
          borderColor={active ? "teal.500" : undefined}
          rounded="base"
          color={active ? "white" : "teal.500"}
          mr="3"
        >
          {icon}
        </Center>
        {children}
      </Flex>
    </NextLink>
  );
};

export const mainNavLinks = [
  {
    icon: <CalendarIcon />,
    href: "/blog/overview/all",
    label: "全部文章",
    postsCount:
      getPostsCategoriesGroup().find((c) => "/blog/all".includes(c.category))
        ?.total || 0,
  },
  {
    icon: <DiJavascript />,
    href: "/blog/overview/javascript",
    label: "JavaScript",
    postsCount:
      getPostsCategoriesGroup().find((c) =>
        "/blog/overview/javascript".includes(c.category),
      )?.total || 0,
  },
  {
    icon: <FaCss3Alt />,
    href: "/blog/overview/css",
    label: "CSS",
    postsCount:
      getPostsCategoriesGroup().find((c) => "/blog/css".includes(c.category))
        ?.total || 0,
  },
  {
    icon: <FaReact />,
    href: "/blog/overview/react",
    label: "React",
    postsCount:
      getPostsCategoriesGroup().find((c) => "/blog/react".includes(c.category))
        ?.total || 0,
  },
  {
    icon: <FaVuejs />,
    href: "/blog/overview/vue",
    label: "Vue",
    postsCount:
      getPostsCategoriesGroup().find((c) => "/blog/vue".includes(c.category))
        ?.total || 0,
  },
  {
    icon: <SiWebpack />,
    href: "/blog/overview/module",
    label: "工程 & 模块化",
    postsCount:
      getPostsCategoriesGroup().find((c) => "/blog/module".includes(c.category))
        ?.total || 0,
  },
  {
    icon: <FaNodeJs />,
    href: "/blog/overview/node",
    label: "node后端",
    postsCount:
      getPostsCategoriesGroup().find((c) => "/blog/node".includes(c.category))
        ?.total || 0,
  },
  {
    icon: <FiPenTool />,
    href: "/blog/overview/other",
    label: "其他",
    postsCount:
      getPostsCategoriesGroup().find((c) => "/blog/other".includes(c.category))
        ?.total || 0,
  },
];

export const MainNavLinkGroup = (props: ListProps) => {
  const [playHover] = useSound("/sounds/plunger-immediate.mp3", {
    volume: 0.1,
  });
  return (
    <List spacing="4" styleType="none" {...props}>
      {mainNavLinks.map((item) => (
        <ListItem
          key={item.label}
          onMouseEnter={() => {
            playHover();
          }}
          padding="1"
          _hover={{
            bgColor: "teal.50",
          }}
        >
          <MainNavLink icon={item.icon} href={item.href} label={item.label}>
            <Flex flex="1" justify="space-between">
              <Text>{item.label}</Text>
              <Text>{item.postsCount}</Text>
            </Flex>
          </MainNavLink>
        </ListItem>
      ))}
    </List>
  );
};

const Sidebar = () => {
  return (
    <Box
      aria-label="Main Navigation"
      as="nav"
      pos="sticky"
      overscrollBehavior="contain"
      top="6.5rem"
      w="280px"
      h="calc(100vh - 8.125rem)"
      pr="8"
      pb="6"
      pl="6"
      pt="4"
      overflowY="auto"
      className="sidebar-content"
      flexShrink={0}
      display={{ base: "none", md: "block" }}
    >
      <MainNavLinkGroup mb="10" />
    </Box>
  );
};

export default Sidebar;
