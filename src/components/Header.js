import { Flex, Text } from "@chakra-ui/react";
import HeaderMenu from "./HeaderMenu";

function Header() {
  return (
    <Flex w="100%" h="64px" bg="yellow.50" px="2rem" alignItems="center">
      <HeaderMenu />
      <Text fontSize="2xl" fontWeight="700" textColor="yellow.700" ml="1rem">
        Message Queue Admin Dashboard
      </Text>
    </Flex>
  );
}

export default Header;
