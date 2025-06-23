import {
  Box,
  chakra,
  Flex,
  Heading,
  HStack,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import * as React from "react";
import PageTransition from "./page-transition";
import TableOfContent from "@/components/table-of-content";
import BlogTags from "@/components/post-tags";
import Sidebar from "@/components/sidebar/blog-sidebar";
import ReadingIndicator from "@/components/reading-indicator";

function useHeadingFocusOnRouteChange() {
  const router = useRouter();

  React.useEffect(() => {
    const onRouteChange = () => {
      const [heading] = Array.from(document.getElementsByTagName("h1"));
      heading?.focus();
    };
    router.events.on("routeChangeComplete", onRouteChange);
    return () => {
      router.events.off("routeChangeComplete", onRouteChange);
    };
  }, [router.events]);
}

export interface Heading {
  level: "h2" | "h3";
  text: string;
  id: string;
}

export interface BlogContainerProps {
  frontmatter: {
    title: string;
    slug?: string;
    description?: string;
    authors?: string[];
    categories?: string[];
    tags?: string[];
    date?: string;
    headings?: Heading[];
  };
  children?: React.ReactNode;
  pagination?: React.ReactElement;
}

function BlogPageContainer(props: BlogContainerProps) {
  const { frontmatter, children, pagination } = props;
  useHeadingFocusOnRouteChange();

  const isPostDetail = frontmatter.tags && frontmatter.slug;
  const {
    title,
    date,
    tags = [],
    categories = [],
    headings = [],
  } = frontmatter;

  const progressViewTargetRef = React.useRef<HTMLDivElement>();

  if (!frontmatter) {
    return <></>;
  }

  return (
    <>
      {isPostDetail && (
        <ReadingIndicator progressViewTargetRef={progressViewTargetRef} />
      )}
      <Box w="100vw" maxW="6xl" mx="auto">
        <Box display={{ md: "flex" }}>
          <Sidebar />
          <Box flex="1" minW="0" mb={{ base: "8", md: "12" }}>
            <Box w="full" mb="2">
              <Box
                as="img"
                src="/img/banner/banner-lim-cut.png"
                alt="Blog Banner"
                w="100%"
                maxH="320px"
                objectFit="cover"
                mx="auto"
                display="block"
                borderBottomLeftRadius="lg"
                borderBottomRightRadius="lg"
              />
            </Box>
            <Box
              id="content"
              mx="auto"
              minH="76vh"
              ref={isPostDetail ? progressViewTargetRef : null}
              w="100%"
            >
              <Flex>
                <Box
                  minW="0"
                  flex="auto"
                  px={{ base: "4", sm: "6", xl: "8" }}
                  pt={{ base: "2", sm: "4", md: "8", xl: "10" }}
                >
                  <PageTransition>
                    <Box
                      minH="20"
                      w="full"
                      display="flex"
                      flexDirection="column"
                      justifyContent="center"
                      px={{ base: "0", md: "6" }}
                    >
                      <chakra.h1
                        tabIndex={-1}
                        outline={0}
                        apply="mdx.h1"
                        fontSize={{ base: "xl", md: "2xl" }}
                        textAlign={isPostDetail ? "left" : "center"}
                      >
                        {title}
                      </chakra.h1>
                      {isPostDetail && (
                        <VStack
                          spacing={4}
                          align="stretch"
                          mt={{ base: "0", md: "2" }}
                        >
                          <HStack
                            display={{ base: "none", md: "flex" }}
                            spacing={8}
                          >
                            <HStack spacing={4}>
                              <Text>קטגוריות:</Text>
                              <BlogTags tags={categories} color="teal" />
                            </HStack>
                            <HStack spacing={4}>
                              <Text>התפרסם:</Text> <Tag>{date}</Tag>
                            </HStack>
                          </HStack>
                          <HStack>
                            <Text>תגיות:</Text>
                            <BlogTags tags={tags} color="orange" />
                          </HStack>
                        </VStack>
                      )}
                    </Box>
                    <Box
                      boxShadow={{ base: "0", md: "2xl" }}
                      rounded={{ base: "0", md: "lg" }}
                      p={{ base: "0", md: "6" }}
                    >
                      {children}
                      <Box mt="40px">{pagination || null}</Box>
                    </Box>
                  </PageTransition>
                </Box>
                {
                  headings.length > 0 && (
                    <TableOfContent
                  headings={headings}
                />
                  )
                }
              </Flex>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default BlogPageContainer;
