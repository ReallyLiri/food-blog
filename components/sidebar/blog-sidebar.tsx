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
import { sortBy } from "lodash";
import NextLink from "next/link";
import { useRouter } from "next/router";
import * as React from "react";
import { ReactElement, ReactNode } from "react";
import { getPostsCategoriesGroup } from "utils/contentlayer";
import {
  ROUTE_OVERVIEW_SEPARATOR,
  routeBlogCategory,
} from "../../layout/routes";
import { ALL_LABEL } from "../../utils/const";

type MainNavLinkProps = {
  href: string;
  icon: ReactElement;
  children: ReactNode;
  label?: string;
};

export const isMainNavLinkActive = (href: string, path: string) => {
  const [_, category] = path.split("/").slice(1);
  const isMain = path.includes(ROUTE_OVERVIEW_SEPARATOR)
    ? path.includes(href)
    : href.includes(routeBlogCategory(category));
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
        className="nav-link-text"
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

export const mainNavLinks = sortBy(getPostsCategoriesGroup(), (_) => [
  _.category !== ALL_LABEL,
  _.category.toLocaleLowerCase(),
]).map((category) => ({
  icon: <CalendarIcon />,
  href: routeBlogCategory(category.category.toLocaleLowerCase()),
  label: category.category,
  postsCount: category.total,
}));

export const MainNavLinkGroup = (props: ListProps) => {
  return (
    <List spacing="4" styleType="none" {...props}>
      {mainNavLinks.map((item) => (
        <ListItem
          key={item.label}
          padding="2"
          borderRadius={4}
          sx={{
            '&:hover': {
              bgColor: 'teal.50',
              '& .nav-link-text': {
                color: 'teal.500'
              }
            }
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
