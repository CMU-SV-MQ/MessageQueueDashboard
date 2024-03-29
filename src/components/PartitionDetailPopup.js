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
  Button,
  Text,
  VStack,
} from "@chakra-ui/react";

const DUMMY_PARTITION_DETAILS = {
  messages: [
    "Message 1: This is a message from p0",
    "Message 2: This is another message from p0",
    "Message 3: Yet another message from p0",
  ],
  commitIndex: ["commitIndex1", "commitIndex2"],
  stashIndex: ["stashIndex1", "stashIndex2"],
};

const PartitionDetailsModal = ({ isOpen, onClose, partitionDetails }) => {
  const details = partitionDetails || {
    messages: [],
    commitIndex: [],
    stashIndex: [],
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
              <Text key={idx}>{atob(message.value)}</Text> // Decoding Base64 message content
            ))}
            {/* {details.messages.map((message, idx) => (
              <Text key={idx}>{atob(message.value)}</Text> // Decoding Base64 message content
            ))} */}
          </VStack>
          {/* <VStack spacing={4} align="stretch">
            <Text fontSize="lg" fontWeight="bold">
              Messages
            </Text>
            {DUMMY_PARTITION_DETAILS.messages.map((message, idx) => (
              <Text key={idx}>{message}</Text>
            ))}
            <Text fontSize="lg" fontWeight="bold">
              Commit Index
            </Text>
            {DUMMY_PARTITION_DETAILS.commitIndex.map((message, idx) => (
              <Text key={idx}>{message}</Text>
            ))}
            <Text fontSize="lg" fontWeight="bold">
              Stash Index
            </Text>
            {DUMMY_PARTITION_DETAILS.stashIndex.map((message, idx) => (
              <Text key={idx}>{message}</Text>
            ))}
          </VStack> */}
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
};

export default PartitionDetailsModal;
