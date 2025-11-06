"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import PropTypes from "prop-types";
import { Flex, Icon, Text } from "@chakra-ui/react";

function SidebarLink({ to, icon, children }) {
  const pathname = usePathname();
  const isActive = pathname === to;

  return (
    <Link href={to} passHref style={{ textDecoration: "none", width: "100%", display: "block" }}>
      <Flex
        alignItems="center"
        gap="2.5"
        px="2"
        py="1.5"
        borderRadius="md"
        fontSize="sm"
        fontWeight="medium"
        color={isActive ? "purple.600" : "gray.700"}
        bg={isActive ? "purple.50" : "transparent"}
        transition="all 0.2s"
        cursor="pointer"
        _hover={{
          bg: "gray.100",
          color: isActive ? "purple.600" : "gray.900",
        }}
        _dark={{
          color: isActive ? "purple.400" : "gray.400",
          bg: isActive ? "gray.900" : "transparent",
          _hover: {
            bg: "gray.900",
            color: isActive ? "purple.400" : "gray.50",
          },
        }}
      >
        <Icon as={icon} boxSize="4" flexShrink="0" aria-hidden="true" />
        <Text>{children}</Text>
      </Flex>
    </Link>
  );
}

SidebarLink.propTypes = {
  to: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
  children: PropTypes.node.isRequired,
};

export default SidebarLink;
