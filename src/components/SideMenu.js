import { Box, Flex, Text, VStack } from "@chakra-ui/react";
// import { useState } from "react";
import SidebarLink from "./SidebarLink";

import {
  HiOutlineServer,
  HiOutlineDatabase,
  HiOutlineChartBar,
  // HiChevronLeft,
  // HiChevronRight,
} from "react-icons/hi";

function Header() {
  // const [collapsed, setCollapsed] = useState(false);

  return (
    <Box
      position="fixed"
      left="0"
      top="0"
      h="100vh"
      w="220px"
      // w={collapsed ? "40px" : "220px"}
      boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
      bgGradient="linear(to-b, purple.600, purple.300)"
      zIndex="docked"
      overflowY="auto"
      transition="width 0.3s"
    >
      <Flex direction="column" justifyContent="left" p="6" height="20">
        <Text
          fontSize="lg"
          fontWeight="bold"
          color="white"
          textAlign="center"
          // display={!collapsed ? "block" : "none"}
        >
          Message Queue Dashboard
        </Text>
        {/* <IconButton
          icon={
            collapsed ? (
              <HiChevronRight color="white" />
            ) : (
              <HiChevronLeft color="white" />
            )
          }
          onClick={() => setCollapsed(!collapsed)}
          variant="ghost"
          position="absolute"
          right="0"
          top="50%"
          transform="translateY(-50%)"
          color="white"
          _hover={{ background: "transparent" }}
        /> */}
      </Flex>
      <VStack
        align="start"
        spacing={0} // Adjust the vertical space between each button
        display="flex"
        p="2"
        // display={!collapsed ? "flex" : "none"}
        // p={collapsed ? "0" : "2"} // Adds padding when not collapsed
      >
        <SidebarLink to="/dashboard" icon={HiOutlineServer}>
          Broker Management
        </SidebarLink>
        <SidebarLink to="/dashboard/relationshipView" icon={HiOutlineChartBar}>
          Relationship View
        </SidebarLink>
        <SidebarLink to="/dashboard/topicDetail" icon={HiOutlineDatabase}>
          Topic Detail
        </SidebarLink>
        <SidebarLink to="/dashboard/operations" icon={HiOutlineDatabase}>
          Operations
        </SidebarLink>
      </VStack>
    </Box>
  );
}

export default Header;
