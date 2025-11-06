import {
  Box,
  Text,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "@chakra-ui/react";
import PropTypes from "prop-types";

const OperationCard = ({ title, children, buttonText, onClick, minHeight = "220px" }) => {
  return (
    <Box 
      boxShadow="md" 
      borderRadius="2xl"
      border="1px"
      borderColor="gray.200"
      transition="all 0.3s ease-in-out"
      _hover={{ 
        boxShadow: "xl",
        transform: "translateY(-4px) scale(1.01)",
        borderColor: "purple.300"
      }}
      h="full"
      overflow="hidden"
    >
      <Card h="full" display="flex" flexDirection="column" borderRadius="2xl" overflow="hidden">
        <CardHeader
          bgGradient="linear(to-r, purple.600, purple.400)"
          borderTopRadius="2xl"
          py="4"
        >
          <Text fontSize="lg" fontWeight="bold" color="white">
            {title}
          </Text>
        </CardHeader>
        <CardBody
          flex="1"
          display="flex"
          flexDirection="column"
          justifyContent="flex-start"
          px="6"
          pt="6"
          pb="3"
          minH={minHeight}
        >
          {children}
        </CardBody>
        <CardFooter 
          display="flex" 
          justifyContent="center" 
          px="6"
          py="4"
          pt="0"
          borderBottomRadius="2xl"
        >
          <Button
            onClick={onClick}
            colorScheme="purple"
            variant="solid"
            w="full"
            maxW="200px"
            size="md"
            transition="all 0.2s"
            _hover={{
              transform: "scale(1.03)",
              boxShadow: "md",
            }}
          >
            {buttonText}
          </Button>
        </CardFooter>
      </Card>
    </Box>
  );
};

OperationCard.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  buttonText: PropTypes.string,
  onClick: PropTypes.func,
  minHeight: PropTypes.string,
};

export default OperationCard;
