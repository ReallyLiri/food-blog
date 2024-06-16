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
        <Heading>אין בנמצא</Heading>
        <Text fontSize={{ md: "xl" }} paddingBottom={4}>
          לצערנו, הדף הזה אינו קיים עדיין
        </Text>
        <NextLink href="/" passHref>
          <Button
            as="a"
            aria-label="בחזרה לדף הבית"
            leftIcon={<FaHome />}
            colorScheme="teal"
            size="lg"
          >
            בחזרה לדף הבית
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
