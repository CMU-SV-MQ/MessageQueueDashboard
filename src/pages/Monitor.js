import Header from "../components/Header";
import PropTypes from "prop-types";
import {
  Box,
  Grid,
  GridItem,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

// dummy data
const topics = [
  { id: "topic0", partitions: ["P0", "P1", "P2", "P3"] },
  { id: "topic1", partitions: ["P0", "P1", "P2"] },
];

const consumerGroups = [
  { id: "consumerGroup0", consumers: ["consumer1", "consumer2"] },
  { id: "consumerGroup1", consumers: ["consumer3"] },
];

const MotionBox = motion(Box);

const TopicCard = ({ topic }) => (
  <MotionBox
    bg="yellow.100"
    p={4}
    borderRadius="md"
    boxShadow="base"
    layout
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <Wrap spacing="10px">
      {topic.partitions.map((partition) => (
        <WrapItem key={partition}>
          <Box p={2} border="1px" borderColor="gray.200" borderRadius="md">
            {partition}
          </Box>
        </WrapItem>
      ))}
    </Wrap>
  </MotionBox>
);

TopicCard.propTypes = {
  topic: PropTypes.shape({
    partitions: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

const ConsumerGroupCard = ({ group }) => (
  <MotionBox
    bg="green.100"
    p={4}
    borderRadius="md"
    boxShadow="base"
    layout
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <Wrap spacing="10px">
      {group.consumers.map((consumer) => (
        <WrapItem key={consumer}>
          <Box p={2} border="1px" borderColor="gray.200" borderRadius="md">
            {consumer}
          </Box>
        </WrapItem>
      ))}
    </Wrap>
    {/* <VStack>
      {group.consumers.map((consumer) => (
        <Box
          key={consumer}
          p={2}
          border="1px"
          borderColor="gray.200"
          borderRadius="md"
        >
          {consumer}
        </Box>
      ))}
    </VStack> */}
  </MotionBox>
);

ConsumerGroupCard.propTypes = {
  group: PropTypes.shape({
    consumers: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

// Monitor component
function Monitor() {
  return (
    <Box>
      <Header />
      <Grid templateColumns="repeat(2, 1fr)" gap={6} p={6}>
        <GridItem>
          <Text fontSize="lg" mb={4}>
            Topics
          </Text>
          <VStack spacing={4}>
            {topics.map((topic) => (
              <TopicCard key={topic.id} topic={topic} />
            ))}
          </VStack>
        </GridItem>
        <GridItem>
          <Text fontSize="lg" mb={4}>
            Consumers
          </Text>
          <VStack spacing={4}>
            {consumerGroups.map((group) => (
              <ConsumerGroupCard key={group.id} group={group} />
            ))}
          </VStack>
        </GridItem>
      </Grid>
      {/* Relationship lines can be added with SVG or canvas drawing */}
    </Box>
  );
}

export default Monitor;
