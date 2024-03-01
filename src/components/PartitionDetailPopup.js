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

// Define dummy data for partition details
const DUMMY_PARTITION_DETAILS = {
  messages: [
    "Message 1: This is a message from p0",
    "Message 2: This is another message from p0",
    "Message 3: Yet another message from p0",
  ],
  commitIndex: [
    "Message 1: This is a message from p0",
    "Message 2: This is another message from p0",
  ],
  stashIndex: [
    "Message 1: This is a message from p0",
    "Message 2: This is another message from p0",
  ],
};

// Partition Details Modal Component
const PartitionDetailsModal = ({ isOpen, onClose }) => {
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
          </VStack>
        </ModalBody>
        <ModalFooter />
        {/* <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter> */}
      </ModalContent>
    </Modal>
  );
};

export default PartitionDetailsModal;
