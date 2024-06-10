import { HStack, Tag, SpaceProps } from "@chakra-ui/react";
import React from "react";
import { ThemeTypings } from "@chakra-ui/styled-system";

interface IBlogTags {
  tags: Array<string>;
  marginTop?: SpaceProps["marginTop"];
  color: ThemeTypings["colorSchemes"];
}

const BlogTags: React.FC<IBlogTags> = (props) => {
  return (
    <HStack spacing={2} marginTop={props.marginTop}>
      {props.tags.map((tag) => {
        return (
          <Tag size={"sm"} variant="solid" colorScheme={props.color} key={tag}>
            {tag}
          </Tag>
        );
      })}
    </HStack>
  );
};

export default BlogTags;
