/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Box,
  Code,
  Text,
  VStack,
} from "@chakra-ui/react";

// const DUMMY_PARTITION_DETAILS = {
//   messages: [
//     "Message 1: This is a message from p0",
//     "Message 2: This is another message from p0",
//     "Message 3: Yet another message from p0",
//   ],
//   commitIndex: ["commitIndex1", "commitIndex2"],
//   stashIndex: ["stashIndex1", "stashIndex2"],
// };

const PartitionDetailsModal = ({ isOpen, onClose, partitionDetails }) => {
  const details = partitionDetails || {
    messages: [],
    groupCurrentOffsets: {},
    groupCommittedOffsets: {},
  };

  const renderOffsets = (offsets) => {
    return Object.entries(offsets).map(([groupId, offset], idx) => (
      <Box key={idx}>
        <Text as="span" fontWeight="bold">
          {groupId}:
        </Text>{" "}
        <Code>{JSON.stringify(offset)}</Code>
      </Box>
    ));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Partition Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4} align="stretch">
            <Text fontSize="lg" fontWeight="bold">
              Messages
            </Text>
            {details.messages.map((message, idx) => (
              <Text key={idx}>{message.value}</Text> // Directly showing message content
            ))}
            {/* {details.messages.map((message, idx) => (
              <Text key={idx}>{atob(message.value)}</Text> // Decoding Base64 message content
            ))} */}
            <Text fontSize="lg" fontWeight="bold">
              Current Offsets
            </Text>
            {renderOffsets(details.groupCurrentOffsets)}

            <Text fontSize="lg" fontWeight="bold">
              Committed Offsets
            </Text>
            {renderOffsets(details.groupCommittedOffsets)}
          </VStack>
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
};

export default PartitionDetailsModal;
