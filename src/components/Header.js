import { Flex, Text } from "@chakra-ui/react";
import HeaderMenu from "./HeaderMenu";

function Header() {
  return (
    <Flex w="100%" h="80px" bg="purple.800" px="2rem" alignItems="center">
      <HeaderMenu />
      <Text fontSize="2xl" fontWeight="700" textColor="white" ml="1rem">
        Message Queue Admin Dashboard
      </Text>
    </Flex>
  );
}

export default Header;
