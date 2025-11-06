"use client";

import { Box, Flex, Text, VStack, Image } from "@chakra-ui/react";
import SidebarLink from "./SidebarLink";

import {
  HiOutlineChartBar,
  HiOutlineDocumentText,
  HiOutlineCog,
} from "react-icons/hi";

function Header() {
  return (
    <Box
      as="nav"
      position="fixed"
      left="0"
      top="0"
      h="100vh"
      w="288px"
      borderRight="1px"
      borderColor="gray.200"
      bg="white"
      zIndex="docked"
      overflowY="auto"
      display={{ base: "none", lg: "flex" }}
      flexDirection="column"
      _dark={{
        borderColor: "gray.800",
        bg: "gray.950",
      }}
    >
      <Flex
        direction="column"
        gap="6"
        p="4"
        h="100%"
      >
        {/* Logo Section */}
        <Flex alignItems="center" gap="1" mb="4">
          <Image
            src="/MQ_Logo.jpeg"
            alt="MQ Logo"
            boxSize="40px"
            borderRadius="full"
            objectFit="cover"
          />
          <Text
            fontSize="lg"
            fontWeight="bold"
            color="gray.900"
            _dark={{ color: "white" }}
          >
            Scotty Message Queue
          </Text>
        </Flex>

        {/* Navigation Links */}
        <Box as="nav" aria-label="core navigation links" flex="1">
          <VStack 
            as="ul" 
            role="list" 
            spacing="0.5" 
            align="stretch"
            listStyleType="none"
            pl="0"
          >
            <Box as="li">
              <SidebarLink to="/relationshipView" icon={HiOutlineChartBar}>
                Relationship View
              </SidebarLink>
            </Box>
            <Box as="li">
              <SidebarLink to="/topicDetail" icon={HiOutlineDocumentText}>
                Topic Detail
              </SidebarLink>
            </Box>
            <Box as="li">
              <SidebarLink to="/operations" icon={HiOutlineCog}>
                Operations
              </SidebarLink>
            </Box>
          </VStack>
        </Box>
      </Flex>
    </Box>
  );
}

export default Header;
