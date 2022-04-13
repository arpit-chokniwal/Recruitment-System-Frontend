import React from "react";
import { Image, Box, Flex } from "@chakra-ui/react";
function NotFound() {
  return (
    <>
      <Box w="100%" bgColor="#f7f9fb">
        <Flex justify="center">
          <Image src="https://cdn.dribbble.com/users/718859/screenshots/3267029/jisunpark_404-error.gif" />
        </Flex>
      </Box>
    </>
  );
}

export default NotFound;
