import React from "react";
import { Link as ChakraLink } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

interface LinkProps {
  to: string;
}

const Link: React.FC<LinkProps> = (props) => {
  return (
    <ChakraLink as={RouterLink} {...props} to={props.to}>
      {props.children}
    </ChakraLink>
  );
};

export default Link;
