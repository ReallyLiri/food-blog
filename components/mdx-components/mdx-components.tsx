import * as Chakra from "@chakra-ui/react";
import * as React from "react";
import {
  ColorPalette,
  ColorPalettes,
  ColorWrapper,
} from "components/color-palette";
import { Anchor } from "components/mdx-components/anchor";
import { LinkedHeading } from "components/mdx-components/linked-heading";
import { Table, TData, THead } from "components/mdx-components/table";
import { VideoPlayer } from "components/mdx-components/video-player";

const { Alert, AspectRatio, Box, chakra, Kbd } = Chakra;

const notSupported = () => <div>Not supported</div>;

export const MDXComponents = {
  ...Chakra,
  h1: (props) => <chakra.h1 apply="mdx.h1" {...props} />,
  h2: (props) => <LinkedHeading apply="mdx.h2" {...props} />,
  h3: (props) => <LinkedHeading as="h3" apply="mdx.h3" {...props} />,
  h4: (props) => <LinkedHeading as="h4" apply="mdx.h4" {...props} />,
  h5: (props) => <LinkedHeading as="h5" apply="mdx.h5" {...props} />,
  hr: (props) => <chakra.hr apply="mdx.hr" {...props} />,
  strong: (props) => <Box as="strong" fontWeight="semibold" {...props} />,
  kbd: Kbd,
  br: ({ reset, ...props }) => (
    <Box
      as={reset ? "br" : undefined}
      height={reset ? undefined : "24px"}
      {...props}
    />
  ),
  table: Table,
  th: THead,
  td: TData,
  a: Anchor,
  p: (props) => <chakra.p apply="mdx.p" {...props} />,
  ul: (props) => <chakra.ul apply="mdx.ul" {...props} />,
  ol: (props) => <chakra.ol apply="mdx.ul" {...props} />,
  li: (props) => <chakra.li pb="4px" {...props} />,
  blockquote: (props) => (
    <Alert
      mt="4"
      role="none"
      status="warning"
      variant="left-accent"
      as="blockquote"
      rounded="4px"
      my="1.5rem"
      {...props}
    />
  ),
  code: notSupported,
  pre: notSupported,
  ComponentLinks: notSupported,
  IconsList: notSupported,
  PropsTable: notSupported,
  FrameworkLinks: notSupported,
  VideoPlayer,
  AspectRatio,
  ColorPalette,
  ColorPalettes,
  ColorWrapper,
};
