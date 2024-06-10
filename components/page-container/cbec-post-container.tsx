import {
  Box,
  Container,
  Text,
  Heading,
  VStack,
  HStack,
  Tag,
  Link,
  Button,
  Flex,
} from "@chakra-ui/react";
import { ReactNode, useRef } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { CoreContent } from "utils/contentlayer";
import type { CbecNote } from "contentlayer/generated";
import SEO from "../seo";
import PageTransition from "./page-transition";
import ReadingIndicator from "../reading-indicator";

const postDateTemplate: Intl.DateTimeFormatOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

interface Props {
  content: CoreContent<CbecNote>;
  next?: { slug: string; title: string };
  prev?: { slug: string; title: string };
  children: ReactNode;
}

export default function CbecPostContainer({
  content,
  next,
  prev,
  children,
}: Props) {
  const { date, title, tags, description } = content;
  const { push } = useRouter();

  const progressViewBoxRef = useRef<HTMLDivElement>();

  return (
    <>
      <SEO title={title} description={description} />
      <ReadingIndicator progressViewTargetRef={progressViewBoxRef} />
      <Container
        ref={progressViewBoxRef}
        as="article"
        maxW="5xl"
        w="100vw"
        mx="auto"
        px="1rem"
        my={{ base: "7", md: "14" }}
      >
        <PageTransition>
          <Heading
            as="header"
            mb={{ base: "7", md: "14" }}
            w="full"
            boxSizing="border-box"
            textAlign="center"
            fontSize={{ base: "2xl", md: "4xl" }}
          >
            {title}
          </Heading>
          <Flex w="full">
            <VStack
              spacing="14"
              alignItems="start"
              position="sticky"
              top="20"
              mr="16"
              w="48"
              as="nav"
              overscrollBehavior="contain"
              h="calc(100vh - 8.125rem)"
              display={{ base: "none", md: "block" }}
            >
              <Box w="full">
                <Box my="4">
                  <Text>DATE</Text>
                  <Box as="time" color="teal" dateTime={date} my="1">
                    {new Date(date).toLocaleDateString(
                      "en-US",
                      postDateTemplate,
                    )}
                  </Box>
                </Box>
                {tags && (
                  <Box w="full">
                    <Text>TAGS</Text>
                    <HStack my="1">
                      {tags.map((tag) => (
                        <Tag key={tag} variant="outline" colorScheme="teal">
                          {tag}
                        </Tag>
                      ))}
                    </HStack>
                  </Box>
                )}
              </Box>
              {(next || prev) && (
                <VStack spacing={5} w="full">
                  {prev && (
                    <Box w="full">
                      <Text my="1">PREVIOUS ARTICLE</Text>
                      <NextLink href={`/cbec-note/${prev.slug}`} passHref>
                        <Link
                          w="full"
                          colorScheme="teal"
                          color="teal"
                          wordBreak="break-all"
                          overflowWrap="break-word"
                        >
                          {prev.title}
                        </Link>
                      </NextLink>
                    </Box>
                  )}
                  {next && (
                    <Box w="full">
                      <Text>NEXT ARTICLE</Text>
                      <NextLink href={`/cbec-note/${next.slug}`} passHref>
                        <Link
                          w="full"
                          colorScheme="teal"
                          color="teal"
                          wordBreak="break-all"
                          overflowWrap="break-word"
                        >
                          {next.title}
                        </Link>
                      </NextLink>
                    </Box>
                  )}
                </VStack>
              )}
              <Button
                p="0"
                m="0"
                w="full"
                textAlign="left"
                color="teal"
                variant="unstyled"
                onClick={() => push("/cbec-note")}
              >
                &larr; Back to the list page
              </Button>
            </VStack>
            <Box
              flex="1"
              overflowWrap="break-word"
              maxW="full"
              boxSizing="border-box"
            >
              {children}
            </Box>
          </Flex>
        </PageTransition>
      </Container>
    </>
  );
}
