/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/SideMenu";
import PageTitle from "../components/PageTitle";
import { HiOutlineDatabase, HiRefresh } from "react-icons/hi";
import PartitionDetailsModal from "../components/PartitionDetailPopup";
import { Box, useDisclosure, VStack, Flex, Text } from "@chakra-ui/react";
import secrets from "../config.json";

const proxyUrl = secrets["proxy-url"];

function TopicDetail() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedPartitionDetails, setSelectedPartitionDetails] =
    useState(null);
  const [topics, setTopics] = useState([]);

  const sidebarWidth = "210px";

  const fetchBrokerData = async () => {
    try {
      const response = await axios.get(`${proxyUrl}/broker`);
      const brokerData = response.data;

      const formattedTopics = Object.entries(
        brokerData.brokerRes.topicPartitions
      ).map(([topic, partitions]) => ({
        id: topic,
        partitions: partitions.map((partition) => ({
          partitionId: `P${partition.partitionId}`,
          messages: partition.messages,
          groupCurrentOffsets: partition.groupCurrentOffsets,
          groupCommittedOffsets: partition.groupCommittedOffsets,
        })),
      }));

      setTopics(formattedTopics);
      console.log(formattedTopics);
    } catch (error) {
      console.error("Failed to fetch broker data:", error);
    }
  };

  useEffect(() => {
    fetchBrokerData();
  }, []);

  const handleBadgeClick = (topicId, partitionId) => {
    const topic = topics.find((t) => t.id === topicId);
    if (topic) {
      const partition = topic.partitions.find(
        (p) => p.partitionId === partitionId
      );
      if (partition) {
        setSelectedPartitionDetails({
          ...partition,
          groupCurrentOffsets: partition.groupCurrentOffsets,
          groupCommittedOffsets: partition.groupCommittedOffsets,
        });
        onOpen();
      }
    }
  };

  const allAccordionIndexes = topics.map((_, index) => index);

  return (
    <Flex>
      <Header />
      <VStack
        spacing={4}
        ml={sidebarWidth}
        w={`calc(100% - ${sidebarWidth})`}
        p="4"
      >
        <Flex w="100%" px="2rem" flexDirection="column">
          <PageTitle title="Topic Detail" icon={HiOutlineDatabase} />
          <Flex wrap="wrap" justify="space-around">
            {topics.map((topic, idx) => (
              <Box
                key={idx}
                borderRadius="lg"
                p={0}
                m={2}
                boxShadow="md"
                width="calc(50% - 1rem)"
              >
                <Box
                  bgGradient="linear(to-r, purple.600, purple.300)"
                  borderRadius="lg"
                  p={3}
                  borderBottomRadius={0}
                >
                  <Text fontSize="lg" color="white">
                    {topic.id}
                  </Text>
                </Box>
                <Box
                  bg="gray.50"
                  p={3}
                  borderTopRadius={0}
                  borderBottomRadius="lg"
                >
                  <Flex direction="row" wrap="wrap" justify="start">
                    {topic.partitions.map((partition, pIdx) => (
                      <Box
                        key={pIdx}
                        borderRadius="full"
                        bg="purple.100"
                        color="purple.800"
                        height="45px"
                        width="45px"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        fontSize="sm"
                        m={2}
                        cursor="pointer"
                        onClick={() =>
                          handleBadgeClick(topic.id, partition.partitionId)
                        }
                      >
                        {partition.partitionId}
                      </Box>
                    ))}
                  </Flex>
                </Box>
              </Box>
            ))}
          </Flex>
        </Flex>

        <PartitionDetailsModal
          isOpen={isOpen}
          onClose={onClose}
          partitionDetails={selectedPartitionDetails}
        />
      </VStack>
    </Flex>
  );
}

export default TopicDetail;
