import { Box, Text } from "@chakra-ui/react";
import PropTypes from "prop-types";

// Card component
const OperationCard = ({ title, children }) => {
  return (
    <Box boxShadow="md" width="calc(50% - 1rem)" m="2">
      <Box
        bgGradient="linear(to-r, purple.600, purple.300)"
        // bgColor={"purple.50"}
        borderRadius="lg"
        p={3}
        borderBottomRadius={0}
      >
        <Text fontSize="lg" color="white">
          {title}
        </Text>
      </Box>
      <Box
        bg="gray.50"
        p={3}
        borderTopRadius={0}
        borderBottomRadius="lg"
        minHeight="100px" // Minimum height to ensure that cards with less content are not too small
      >
        {children}
      </Box>
    </Box>
  );
};

OperationCard.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default OperationCard;
