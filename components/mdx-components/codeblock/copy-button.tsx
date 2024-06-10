import { Button, ButtonProps, useClipboard } from "@chakra-ui/react";
import { CopyIcon } from "@chakra-ui/icons";
import React from "react";

interface CopyButtonProps extends ButtonProps {
  code: string;
}

function CopyButton({ code, ...props }: CopyButtonProps) {
  const { hasCopied, onCopy } = useClipboard(code);

  return (
    <Button
      size="xs"
      m="0"
      p="0"
      position="absolute"
      textTransform="uppercase"
      colorScheme="teal"
      fontSize="xs"
      height="24px"
      top={0}
      zIndex="1"
      right="1.25em"
      {...props}
      onClick={onCopy}
    >
      {hasCopied ? "Copied" : <CopyIcon color="white" />}
    </Button>
  );
}

export default CopyButton;
