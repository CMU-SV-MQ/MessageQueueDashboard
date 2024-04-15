/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/SideMenu";
import PageTitle from "../components/PageTitle";
import { HiOutlineDatabase, HiRefresh } from "react-icons/hi";
import PartitionDetailsModal from "../components/PartitionDetailPopup";
import { Box, useDisclosure, VStack, Flex, Text } from "@chakra-ui/react";

function Operations() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedPartitionDetails, setSelectedPartitionDetails] =
    useState(null);
  const [topics, setTopics] = useState([]);

  const sidebarWidth = "210px";

  const fetchBrokerData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/broker");
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
          <PageTitle title="Operations" icon={HiOutlineDatabase} />
          <Flex wrap="wrap" justify="space-around"></Flex>
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

export default Operations;
