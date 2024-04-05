import { useState } from "react";
import PropTypes from "prop-types";
import { Button, Flex, Text } from "@chakra-ui/react";
// import NodeLabel from "./NodeLabel";
import { HiOutlineX } from "react-icons/hi";

function BrokerCard({ nodeData, stopBroker }) {
  const [isAdding, setIsAdding] = useState(false);
  const bgColor = nodeData.isLeader ? "purple.300" : "gray.100";
  const contentColor = nodeData.isLeader ? "purple.50" : "gray.600";
  const borderColor = nodeData.isLeader ? "purple.700" : "gray.300";

  return (
    <Flex
      h="80px"
      w="240px"
      flexDirection="row"
      justifyContent="start"
      alignItems="center"
      border="2px"
      borderColor={borderColor}
      borderRadius="xl"
      p={2}
      m={2}
      bg={bgColor}
    >
      <Flex
        w="56px"
        h="56px"
        borderRadius="lg"
        border="4px"
        borderColor={contentColor}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Text fontSize="3xl" fontWeight="700" color={contentColor}>
          {nodeData.brokerId}
        </Text>
      </Flex>
      <Flex
        flexDirection="column"
        justifyContent="start"
        alignItems="start"
        ml="3"
      >
        <Text fontSize="md" color={contentColor} fontWeight={"700"}>
          {nodeData.isLeader ? "Leader" : "Follower"}
        </Text>
        {/* <NodeLabel status={nodeData.status} /> */}
      </Flex>
      <Button
        size={"sm"}
        bg="orange.400"
        ml="auto"
        leftIcon={<HiOutlineX size="10px" />}
        isLoading={isAdding}
        onClick={async () => {
          setIsAdding(true);
          await stopBroker();
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
    brokerId: PropTypes.number.isRequired,
    isLeader: PropTypes.bool.isRequired,
    last_heartbeat: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
  stopBroker: PropTypes.func.isRequired,
};

export default BrokerCard;
