/* eslint-disable no-unused-vars */
import { useState } from "react";
import Header from "../components/Header";
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
  Text,
  Container,
  VStack,
} from "@chakra-ui/react";

const DUMMY_TOPICS = [
  { id: "Topic 1 Name Here", partitions: ["P0", "P1", "P2", "P3"] },
  { id: "Topic 2 Name Here", partitions: ["P0", "P1", "P2", "P3", "P4", "P5"] },
  { id: "Topic 3 Name Here", partitions: ["P0", "P1", "P2"] },
];

function BrokerDetail() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedPartition, setSelectedPartition] = useState(null);

  const handleBadgeClick = (partition) => {
    setSelectedPartition(partition);
    onOpen();
  };

  return (
    <Box>
      <Header />
      <Container maxW="container.xl" pt={5}>
        <VStack spacing={4} align="stretch">
          {/* <Text fontSize="3xl" mb={4}>
            Topic Monitoring
          </Text> */}
          <Heading as="h2" size="lg" color="gray.600" noOfLines={1}>
            Topic Monitoring
          </Heading>
          <Accordion allowMultiple>
            {DUMMY_TOPICS.map((topic, idx) => (
              <AccordionItem key={idx}>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      {topic.id}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Stack direction="row" spacing={4}>
                    {topic.partitions.map((partition, pIdx) => (
                      <Button
                        key={pIdx}
                        variant="ghost"
                        onClick={() => handleBadgeClick(partition)}
                      >
                        <Badge
                          px={4}
                          py={2}
                          borderRadius="lg"
                          variant="solid"
                          colorScheme="gray"
                        >
                          {partition}
                        </Badge>
                      </Button>
                    ))}
                  </Stack>
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </VStack>
      </Container>
      <PartitionDetailsModal
        isOpen={isOpen}
        onClose={onClose}
        partition={selectedPartition}
      />
    </Box>
  );
}

export default BrokerDetail;
