import { useState } from "react";
import PropTypes from "prop-types";
import { Button, Flex, Text } from "@chakra-ui/react";
import NodeLabel from "./NodeLabel";
import { HiOutlineX } from "react-icons/hi";

function BrokerCard({ nodeData, killNode }) {
  const [isAdding, setIsAdding] = useState(false);
  const bgColor = nodeData.isLeader ? "gray.500" : "gray.100";
  const contentColor = nodeData.isLeader ? "gray.50" : "gray.600";
  const borderColor = nodeData.isLeader ? "gray.700" : "gray.300";

  return (
    <Flex
      h="100px"
      w="300px"
      flexDirection="row"
      justifyContent="start"
      alignItems="center"
      border="2px"
      borderColor={borderColor}
      borderRadius="xl"
      p={4}
      m={2}
      bg={bgColor}
    >
      <Flex
        w="64px"
        h="64px"
        borderRadius="lg"
        border="4px"
        borderColor={contentColor}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Text fontSize="4xl" fontWeight="700" color={contentColor}>
          {nodeData.id}
        </Text>
      </Flex>
      <Flex
        flexDirection="column"
        justifyContent="start"
        alignItems="start"
        ml="4"
      >
        <Text fontSize="xl" color={contentColor} fontWeight={"700"}>
          {nodeData.isLeader ? "Leader" : "Follower"}
        </Text>
        <NodeLabel status={nodeData.status} />
      </Flex>
      <Button
        colorScheme="red"
        ml="auto"
        leftIcon={<HiOutlineX />}
        isLoading={isAdding}
        onClick={async () => {
          setIsAdding(true);
          await killNode();
          setIsAdding(false);
        }}
      >
        Stop
      </Button>
    </Flex>
  );
}

BrokerCard.propTypes = {
  nodeData: PropTypes.shape({
    id: PropTypes.number.isRequired,
    isLeader: PropTypes.bool.isRequired,
    last_heartbeat: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
  killNode: PropTypes.func.isRequired,
};

export default BrokerCard;
