import { Button, Heading, Text, VStack } from "@chakra-ui/react";
import NextLink from "next/link";
import * as React from "react";
import { FaHome } from "react-icons/fa";
import BaseLayout from "layout/base-layout";

const NotFound = () => {
  return (
    <>
      <VStack
        justify="center"
        spacing="4"
        as="section"
        mt={["10", null, "20"]}
        textAlign="center"
      >
        <Heading>Not Found</Heading>
        <Text fontSize={{ md: "xl" }}>
          Unfortunately, this page does not exist
        </Text>
        <NextLink href="/" passHref>
          <Button
            as="a"
            aria-label="Back to Home"
            leftIcon={<FaHome />}
            colorScheme="teal"
            size="lg"
          >
            Back to Home
          </Button>
        </NextLink>
      </VStack>
    </>
  );
};

const NotFoundPage = () => {
  return <BaseLayout main={<NotFound />} />;
};

export default NotFoundPage;
