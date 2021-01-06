import { Box, Center, Flex, Heading, Spacer, Text } from "@chakra-ui/react";
import React from "react";
import Link from "./Link";

const Navbar: React.FC = () => {
  return (
    <Flex w="100%" boxShadow="sm" px={2} py={6}>
      <Box ml={4}>
        <Heading size="md">Ruddit</Heading>
      </Box>
      <Spacer />
      <Flex mr={4}>
        <Center>
          <Link to="/">Home</Link>
          <Link to="/register">
            <Text ml={2} color="tomato">
              Register
            </Text>
          </Link>
        </Center>
      </Flex>
    </Flex>
  );
};

export default Navbar;
