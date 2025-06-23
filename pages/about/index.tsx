import type { NextPage } from "next";
import {
  Button,
  Container,
  Heading,
  Icon,
  Stack,
  Text,
  VStack,
  Box,
} from "@chakra-ui/react";
import BaseLayout from "layout/base-layout";
import { ROUTE_BLOG } from "../../layout/routes";

const About = () => {
  return (
    <>
      <Container maxW={"5xl"}>
        <VStack py={{ base: 20, md: 28 }} spacing={{ base: 8, md: 10 }}>
          <Heading
            w="full"
            textAlign="center"
            fontSize={{
              base: "3xl",
              sm: "4xl",
              md: "6xl",
            }}
            fontWeight={600}
            lineHeight={"110%"}
            letterSpacing={{
              base: "normal",
              md: "tight",
            }}
            color="gray.900"
            _dark={{
              color: "gray.100",
            }}
            userSelect="none"
          >
            שלום וברוכים הבאים{" "}
            <Text
              as={"span"}
              display={{
                base: "block",
                lg: "inline",
              }}
              bgClip="text"
              bgGradient="linear(to-r, green.400,purple.500)"
              fontWeight="extrabold"
            >
              למסע
            </Text>{" "}
            אל היעד
          </Heading>
          <Text color={"gray.500"} maxW={"3xl"}>
            זהו טקסט
          </Text>
          <Box
            as="img"
            src="/img/banner/banner-lim.png"
            alt="Blog Banner"
            w="100%"
            maxH="50vh"
            objectFit="contain"
            borderBottomLeftRadius="lg"
            borderBottomRightRadius="lg"
            mb={6}
          />
          <Stack spacing={6} direction={"row"}>
            <Button
              px={6}
              as="a"
              href={ROUTE_BLOG}
              rounded={"full"}
              colorScheme="teal"
              bg={"teal.400"}
              _hover={{ bg: "teal.500" }}
              variant="solid"
              display="inline-flex"
              alignItems="center"
              justifyContent="center"
              cursor="pointer"
            >
              {"אל הבלוג"}
              <Icon boxSize={4} mr={1} viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                  transform="rotate(180deg) translate(-18px, -18px)"
                />
              </Icon>
            </Button>
          </Stack>
        </VStack>
      </Container>
    </>
  );
};

const AboutPage: NextPage = () => {
  return <BaseLayout main={<About />} />;
};

export default AboutPage;
