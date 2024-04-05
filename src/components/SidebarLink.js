import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { Box, Link, Text } from "@chakra-ui/react";

function SidebarLink({ to, icon, children }) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      href={to}
      display="flex"
      alignItems="center"
      justifyContent="flex-start"
      p="3"
      width="100%"
      bg={isActive ? "white" : "transparent"}
      color={isActive ? "purple.600" : "white"}
      borderRadius="md"
      _hover={{
        bg: isActive ? "white" : "purple.100",
        color: isActive ? "purple.600" : "white",
      }}
      w="full"
    >
      <Box as={icon} mr={2} />
      <Text fontSize="md">{children}</Text>
    </Link>
  );
}

SidebarLink.propTypes = {
  to: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
  children: PropTypes.node.isRequired,
};

export default SidebarLink;
