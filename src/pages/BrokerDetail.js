/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import PageTitle from "../components/PageTitle";
import { HiOutlineDatabase, HiRefresh } from "react-icons/hi";
import PartitionDetailsModal from "../components/PartitionDetailPopup";
import {
  Box,
  Button,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Badge,
  useDisclosure,
  Heading,
  Stack,
  Container,
  VStack,
  Flex,
  HStack,
  Spacer,
} from "@chakra-ui/react";

// const DUMMY_TOPICS = [
//   { id: "Topic 1 Name Here", partitions: ["P0", "P1", "P2", "P3"] },
//   { id: "Topic 2 Name Here", partitions: ["P0", "P1", "P2", "P3", "P4", "P5"] },
//   { id: "Topic 3 Name Here", partitions: ["P0", "P1", "P2"] },
// ];

function BrokerDetail() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedPartitionDetails, setSelectedPartitionDetails] =
    useState(null);
  const [topics, setTopics] = useState([]);

  const fetchBrokerData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/broker");
      const brokerData = response.data;
      const formattedTopics = brokerData.broker.topicPartitions.map(
        (topic) => ({
          id: topic.topic,
          partitions: topic.partitions.map((partition) => ({
            partitionId: `P${partition.partitionId}`,
            messages: partition.messages,
          })),
        })
      );
      setTopics(formattedTopics);
      // console.log(formattedTopics);
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
        setSelectedPartitionDetails(partition);
        onOpen();
      }
    }
  };

  return (
    <VStack spacing={4}>
      <Header />
      <Flex w="100%" px="2rem" flexDirection="column">
        <Flex w="100%" justifyContent="space-between" alignItems="center">
          <PageTitle title="Topic Monitoring" icon={HiOutlineDatabase} />
          <Spacer />
          <HStack spacing="1rem">
            {/* Insert any buttons or actions specific to this page here, if necessary */}
          </HStack>
        </Flex>
        <Flex w="100%" flexWrap="wrap" justifyContent="start" px="2rem">
          <Accordion allowMultiple w="full">
            {topics.map((topic, idx) => (
              <AccordionItem key={idx}>
                <h2>
                  <AccordionButton py="4">
                    <Box flex="2" textAlign="left" fontSize={20}>
                      {topic.id}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={6}>
                  <Stack direction="row" spacing={4}>
                    {topic.partitions.map((partition, pIdx) => (
                      <Button
                        key={pIdx}
                        variant="ghost"
                        onClick={() =>
                          handleBadgeClick(topic.id, partition.partitionId)
                        }
                      >
                        <Badge
                          px={4}
                          py={2}
                          borderRadius="lg"
                          bg="purple.50"
                          color="purple.800"
                          border="2px"
                          borderColor="purple.500"
                          fontSize="md"
                        >
                          {partition.partitionId}
                        </Badge>
                      </Button>
                    ))}
                  </Stack>
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </Flex>
      </Flex>
      <PartitionDetailsModal
        isOpen={isOpen}
        onClose={onClose}
        partitionDetails={selectedPartitionDetails}
      />
    </VStack>

    // <Box bg="gray.0">
    //   <Header />
    //   <Container maxW="container.xl" pt={5}>
    //     <VStack spacing={4} align="stretch">
    //       <Heading as="h2" size="lg" color="gray.600" noOfLines={1}>
    //         Topic Monitoring
    //       </Heading>
    //       <Accordion allowMultiple>
    //         {topics.map((topic, idx) => (
    //           <AccordionItem key={idx}>
    //             <h2>
    //               <AccordionButton>
    //                 <Box flex="1" textAlign="left">
    //                   {topic.id}
    //                 </Box>
    //                 <AccordionIcon />
    //               </AccordionButton>
    //             </h2>
    //             <AccordionPanel pb={4}>
    //               <Stack direction="row" spacing={4}>
    //                 {topic.partitions.map((partition, pIdx) => (
    //                   <Button
    //                     key={pIdx}
    //                     variant="ghost"
    //                     onClick={() =>
    //                       handleBadgeClick(topic.id, partition.partitionId)
    //                     }
    //                   >
    //                     <Badge
    //                       px={4}
    //                       py={2}
    //                       borderRadius="lg"
    //                       variant="solid"
    //                       colorScheme="gray"
    //                     >
    //                       {partition.partitionId}
    //                     </Badge>
    //                   </Button>
    //                 ))}
    //               </Stack>
    //             </AccordionPanel>
    //           </AccordionItem>
    //         ))}
    //       </Accordion>
    //     </VStack>
    //   </Container>
    //   <PartitionDetailsModal
    //     isOpen={isOpen}
    //     onClose={onClose}
    //     partitionDetails={selectedPartitionDetails}
    //   />
    // </Box>
  );
}

export default BrokerDetail;
