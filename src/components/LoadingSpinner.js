import { Flex, Spinner } from "@chakra-ui/react";

function LoadingSpinner() {
  return (
    <Flex w="100%" h="100%" justifyContent="center" alignItems="center">
      <Spinner size="xl" color="blue.500" />
    </Flex>
  );
}

export default LoadingSpinner;
