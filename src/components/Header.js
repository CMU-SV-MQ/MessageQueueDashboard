import { Flex, Text } from "@chakra-ui/react";
import HeaderMenu from "./HeaderMenu";

function Header() {
  return (
    <Flex w="100%" h="64px" bg="gray.200" px="2rem" alignItems="center">
      <HeaderMenu />
      <Text fontSize="2xl" fontWeight="700" textColor="gray.600" ml="1rem">
        Message Queue Admin Dashboard
      </Text>
    </Flex>
  );
}

export default Header;
