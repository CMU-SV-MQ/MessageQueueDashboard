import {
  Box,
  Heading,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "@chakra-ui/react";
import PropTypes from "prop-types";

const OperationCard = ({ title, children, buttonText }) => {
  return (
    <Box boxShadow="md" borderRadius="lg">
      <Card borderRadius="xl">
        <CardHeader bgGradient="linear(to-r, purple.600, purple.300)">
          <Heading size="md" color="white">
            {title}
          </Heading>
        </CardHeader>
        <CardBody
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          p="1rem"
        >
          {children}
        </CardBody>
        <CardFooter>
          <Button colorScheme="purple" variant="outline" w="fit-content">
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
};

export default OperationCard;
