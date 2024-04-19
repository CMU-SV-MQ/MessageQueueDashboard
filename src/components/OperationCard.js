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

const OperationCard = ({ title, children, buttonText, onClick }) => {
  return (
    <Box boxShadow="md" borderRadius="lg">
      <Card>
        <CardHeader
          bgGradient="linear(to-r, purple.600, purple.300)"
          _first={{ borderTopRadius: "xl" }}
        >
          <Text size="lg" color="white">
            {title}
          </Text>
        </CardHeader>
        <CardBody
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          p="1rem"
        >
          {children}
        </CardBody>
        <CardFooter display="flex" justifyContent="center" p="1rem">
          <Button
            onClick={onClick}
            colorScheme="purple"
            variant="outline"
            w="fit-content"
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
};

export default OperationCard;
